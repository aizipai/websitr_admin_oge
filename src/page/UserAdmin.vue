<template>
  <div>
    <div class="b-top">
      <div class="t-tit">用户管理</div>
      <el-button 
        class="add-user"
          type="primary" 
          size="small" 
          @click="addCompany = true">添加公司</el-button>
        <el-button 
        class="add-user"
          type="primary" 
          size="small" 
          @click="addDepart = true">添加部门</el-button>
    </div>

    <el-tree
     :data="companyData"
     node-key="id"
     :load="loadNode"
     lazy
    :render-content="renderContent"
     @check-change="handleCheckChange"
     style='width:800px;margin-top: 30px; border:none;border-left:1px dashed #ccc'>
     </el-tree>

     <el-dialog title="添加公司" :visible.sync="addCompany" size='tiny'>
      <el-form :model="addCompanyData" ref="addCompany" :inline="true">
        <el-form-item label="公司名称">
          <el-input v-model="addCompanyData.companyName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style='text-align: center'>
        <el-button @click.native="addCompany = false">取消</el-button>
        <el-button type="primary" @click.native="submitComForm('addCompany')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改公司信息" :visible.sync="editCompany" size='tiny'>
      <el-form :model="editCompanyData" ref="eidtCompany" :inline="true">
        <el-form-item label="公司名称" >
          <el-input v-model="editCompanyData.companyName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style='text-align: center'>
        <el-button @click.native="editCompany = false">取消</el-button>
        <el-button type="primary" @click.native="submitComForm('editCompany')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加部门" :visible.sync="addDepart" size='tiny'>
      <el-form :model="addDepartData" ref="addDepart" :inline="true">
        <el-form-item label="公司名称">
          <el-select v-model="addDepartData.companyId" placeholder="请选择公司名称">
             <el-option
               v-for="item in companyData"
               :key="item.companyId"
               :label="item.companyName"
               :value="item.companyId">
             </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="addDepartData.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style='text-align: center'>
        <el-button @click.native="addCompany = false">取消</el-button>
        <el-button type="primary" @click.native="submitDepartForm('addDepart')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改部门" :visible.sync="editDepart" size='tiny'>
      <el-form :model="editDepartData" ref="editDepart" :inline="true">
        <el-form-item label="公司名称">
          <el-select v-model="editDepartData.companyId" placeholder="请选择公司名称">
             <el-option
               v-for="item in companyData"
               :key="item.companyId"
               :label="item.companyName"
               :value="item.companyId">
             </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="editDepartData.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style='text-align: center'>
        <el-button @click.native="editCompany = false">取消</el-button>
        <el-button type="primary" @click.native="submitDepartForm('editDepart')">提交</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        getCompanyUrl: API_URL['GET_COMPANY'], 
        getDepartmentUrl: API_URL['GET_DEPTMENT'], 
        getUsersUrl: API_URL['GET_USER'], 
        companyData:[],
        // ---------------------
        addCompany: false,
        editCompany: false,
        addDepart: false,
        editDepart: false,
        getCompanyUrl: API_URL['GET_COMPANY'], 
        getDepartment: API_URL['GET_DEPTMENT'],

        addCompanyUrl: API_URL['ADD_COM'],
        editCompanyUrl: API_URL['ADD_COM'],

        addDepartUrl: API_URL['ADD_DEPART'],
        editDepartUrl: API_URL['ADD_DEPART'],

        delUrl:API_URL['DEL_C_D'],

        addCompanyData:{
          companyName:null,
        },
        editCompanyData:{
          companyId:null,
          companyName:null,
        },

        addDepartData:{
          companyId:null,
          departmentName:null,
        },
        editDepartData:{
          companyId:null,
          companyName:null,
        },

        showDepartData:null,
      };
    },
    methods: {

      getCompanyData(callback){

        this.$axios.get(this.getCompanyUrl).then((res)=>{
          const result = res.data
          if(result.ok){
            this.companyData = result.data
            typeof callback == 'function' && callback(result.data)
          }else{
            alert('获取公司列表失败')
          }
        })
      },
      submitDepartForm(form){
        const _url = form+ 'Url',
            _params = form + 'Data'

            this.$axios.post(this[_url],this[_params]).then((res)=>{
              const result = res.data
              if(result.ok){
                this.$alert(result.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                          window.location.reload()
                        }
                    });
              }else{
                this.$alert(result.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                          
                        }
                    });
              }
            })

      },      
      submitComForm(form){
        const _url = form+ 'Url',
            _params = form + 'Data'

            this.$axios.post(this[_url],this[_params]).then((res)=>{
              const result = res.data
              if(result.ok){
                this.$alert(result.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                          window.location.reload()
                        }
                    });
              }else{
                this.$alert(result.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                          
                        }
                    });
              }
            })
          
      },
      
      // ----------------------------------

      append(store, data) {
        console.log(data)
        if(data.departmentId == null){
          this.editCompany = true
          this.editCompanyData['companyId'] = data.companyId
          this.editCompanyData['companyName'] = data.companyName
        }else{
          this.editDepart = true
          this.editDepartData['companyId'] = data.companyId
          this.editDepartData['companyName'] = data.departmentName
        }
        
      },

      remove(store, data) {
        console.log(data)

        this.$alert('确定删除吗？', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$axios.get(this.delUrl+data.id).then(res=>{
              const result = res.data
              if(result.ok){
                this.$message({
                  type: 'info',
                  message: '删除成功'
                });
                window.location.reload()
              }
            
            });
          }

        })
          
                
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class='line'>
            <span >
              <span>{data.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>修改</el-button>
              <el-button size="mini" type="danger" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>);
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        console.log(node.data)
        if (node.level === 0) {
          // return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 2) return resolve([]);

        if(node.level===1){

          this.doGetDepartmentData(node.data.companyId,resolve)
          
        }else if(node.level == 2){

          this.doGetUserData(node.data.companyId,node.data.id,resolve)
        }
      },
      doGetCompanyData(){

        this.$axios.get(this.getCompanyUrl).then((res)=>{
          const result = res.data
          if(result.ok){
            this.companyData = result.data

            result.data.forEach(item=>{
              item.label = item.companyName
             })
            typeof callback == 'function' && callback(result.data)
          }else{
            alert('获取公司列表失败')
          }
        })
      },
      doGetDepartmentData(c_id,resolve){

        this.$axios.get(this.getDepartmentUrl+c_id).then((res)=>{
          const result = res.data
          if(result.ok){

             result.data.forEach(item=>{
              item.label = item.departmentName
             })

            resolve(result.data)
          }else{
            alert(result.msg)
          }
        })
      },
      doGetUserData(c_id,d_id,resolve){

        this.$axios.get(this.getUsersUrl+c_id+'/'+d_id).then((res)=>{
          const result = res.data
          if(result.ok){

             result.data.forEach(item=>{
              item.label = item.userAccount
             })
            resolve(result.data)
          }else{
            alert(result.msg)
          }
        })
      }  

    },
    mounted(){
      this.doGetCompanyData()
    }
  };
</script>
<style lang='stylus' scoped>
	.b-top
		padding 20px 0
		border-bottom 1px solid #CCC
		.t-tit
			display inline-block
			font-size 16px
			font-weight 700
		.add-user
			padding 8px 30px
			margin-left 30px	

	.single-depart
		padding 20px
	.button
			float right

</style>
