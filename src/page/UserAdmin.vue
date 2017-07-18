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


		<el-collapse accordion @change="handleChange">
		  <el-collapse-item 
		    v-for="(sigCompany,index) in companyData" :key='index'
		   :name="sigCompany.companyId">
		    <template slot="title">
		      啥啥啥公司{{sigCompany.companyName}}
		      <div class="button">
						<el-button type="info" @click.native="doEditCompany(dep['departmentId'],dep['departmentName'])">修改</el-button>
						<el-button type="danger">删除</el-button>
					</div>
		    </template>

			<template  v-if="showDepartData" >
				<div v-for="(dep,i) in showDepartData" :key='i' class="single-depart">
					<span>{{dep['departmentName']}}</span>
					<div class="button">
						<el-button type="info" @click="doEditCompany(dep['departmentId'],dep['departmentName'])">修改</el-button>
						<el-button type="danger">删除</el-button>
					</div>
    				
				</div>
			</template>

		  </el-collapse-item>
		</el-collapse>

		
		

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
				<el-button type="primary" @click.native="submitComForm('eidtCompany')">提交</el-button>
			</div>
		</el-dialog>


	</div>
</template>
<script>
	export default{
		data(){
			return{
				addCompany: false,
				editCompany: false,
				addDepart: false,
				editDepart: false,
				getCompanyUrl: API_URL['GET_COMPANY'], 
				getDepartment: API_URL['GET_DEPTMENT'],

				addCompanyUrl: API_URL['ADD_COM'],
				eidtCompanyUrl: API_URL['ADD_COM'],

				addDepartUrl: API_URL['ADD_DEPART'],
				editDepartUrl: API_URL['ADD_DEPART'],

				companyData:[],
				departmentData:{},//公司id：部门

				addCompanyData:{
					companyName:null,
				},
				editCompanyData:{
					companyId:null,
					companyName:null,
				},

				showDepartData:null,
			}
		},
		methods:{
			handleChange(_id){
				this.showDepartData = this.departmentData[_id]
			},
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
			doGetDepartmentData(_id){
				if(!_id) return
				if(this.departmentData[_id]){
					return
				}
				this.$axios.get(this.getDepartment + _id).then((res)=>{
					const result = res.data
					if(result.ok){

						this.departmentData[_id] = result.data
					}else{
						alert('获取部门列表失败')
					}
				})
			},
			submitComForm(form){
				const _url = form+ 'Url',
					  _params = form + 'Data'

				this.$refs[form].validate((valid)=>{
					if(valid){
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
					}else{

					}
				})
			},
			doEditCompany(_id,name){
				this.editCompanyData['companyId'] = _id
				this.editCompanyData['companyName'] = name
			}
		},
		mounted(){
			this.getCompanyData((com_data)=>{
				com_data.forEach((single_data)=>{
					this.doGetDepartmentData(single_data.companyId)
				})
			})
		}
	}
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
