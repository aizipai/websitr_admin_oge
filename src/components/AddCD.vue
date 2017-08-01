<template>
    <div>
		
		<el-form-item label="添加公司和部门">
          <el-button @click="dialogVisible = true"  type="success">添加公司和部门</el-button>
    </el-form-item>
		<el-dialog
		  title="添加公司和部门"
		  :visible.sync="dialogVisible"
		  size="small"
		  :show-close='false'
      :close-on-click-modal="false"
      :modal = 'false'
		  >

       <el-form>
         <el-form-item label="授权公司">
          <el-select v-model="sigPermission.companyId" @change='doGetDepartmentData(sigPermission.companyId)' placeholder="请选择公司名称">
                    <el-option
                      v-for="item in companyData"
                      :key="item.companyId"
                      :label="item.companyName"
                      :value="item.companyId"
                      >
                    </el-option>
                  </el-select>
        </el-form-item>

        <el-form-item label="授权部门">
          <el-select v-model="sigPermission.departmentId" placeholder="请选择公司名称" multiple>
                    <el-option
                      v-for="item in departData"
                      :key="item.departmentId"
                      :label="item.departmentName"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>

        </el-form-item>

        <el-form-item label="是否可见">
          <el-radio class="radio" v-model="sigPermission.islooked" label="1">是</el-radio>
            <el-radio class="radio" v-model="sigPermission.islooked" label="0">否</el-radio>
        </el-form-item>

        <el-form-item label="是否可修改">
          <el-radio class="radio" v-model="sigPermission.isupdate" label="1">是</el-radio>
            <el-radio class="radio" v-model="sigPermission.isupdate" label="0">否</el-radio>
        </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="pushItemData">确 定</el-button>
       </div>
		</el-dialog>    	
    </div>
</template>
<script>
  export default {

  	props:{
  		tableData:{
  			type: [String, Array, Object],
  			
  		}
  	},
    data() {
      return {
        dialogVisible:false,
        companyData:null,
        departData:null,
        // departData:[],
        getCompanyUrl: API_URL['GET_COMPANY'], 
        getDepartmentUrl: API_URL['GET_DEPTMENT'], 
        sigPermission:{
          "companyId": null,
          "departmentId": [],
          "islooked": null,
          "isupdate":null
        },
      };
    },
    methods: {
      clearSigData(){
        
        for(let key in this.sigPermission){
                  if(key == 'departmentId'){
                    this.sigPermission[key]= []
                  }else{
                    this.sigPermission[key]= null
                  }
                }
      },
      pushItemData(){

        const _sigPermission = {}
        let flag = true
        for(let key in this.sigPermission){

          if(this.sigPermission[key] == null){
            flag = false
          }
        }
        if(flag){
          for(let key in this.sigPermission){
            _sigPermission[key] = this.sigPermission[key]
            if(key == 'departmentId'){
              _sigPermission[key] = _sigPermission[key].join(',')
            }
          }
          this.$alert('添加成功，可继续添加授权公司和部门', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                console.log(_sigPermission)
                this.$emit('dataCAD',_sigPermission)
                this.clearSigData()
                this.dialogVisible = false
              }
            });
        }else {
          this.$alert('添加失败，检查一下呗！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                
              }
            });
        }
        
        
      },
      doGetDepartmentData(c_id,resolve){
        if(c_id === null){return}
          this.$axios.get(this.getDepartmentUrl+c_id).then((res)=>{
            const result = res.data
            if(result.ok){
              this.departData = result.data
            }else{
              alert(result.msg)
            }
          })
        },
      doGetCompanyData(){

           this.$axios.get(this.getCompanyUrl).then((res)=>{
             const result = res.data
             if(result.ok){
               this.companyData = result.data
             }else{
               alert('获取公司列表失败')
             }
           })
         },
    },
    computed:{
     
    },
    mounted(){
     this.doGetCompanyData()
    }
  };
</script>
<style scoped>
  .el-dialog__wrapper{
    z-index: 9999
  }
   .el-carousel__item{
   	padding:10px;
   }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel-img-wrap {
	width: 100%;
	height: 100%;
	padding: 15px;
  }
  .carousel-img {
  	width: 100%;
  	height: 100%;
  }
</style>