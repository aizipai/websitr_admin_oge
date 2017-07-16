<template>
	<div>
		<div class="b-top">
			<div class="t-tit">用户管理</div>
			<el-button 
				class="add-user"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>



		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading"  style="width: 100%;" max-height="500">
			<el-table-column prop="userUserId" label="ID">
			</el-table-column>
			<el-table-column prop="userAccount" label="账号">
			</el-table-column>
			<el-table-column prop="userName" label="姓名">
			</el-table-column>
			<el-table-column prop="companyId" label="公司名称">
			</el-table-column>
			<el-table-column prop="departmentId" label="职位">
			</el-table-column>
			<el-table-column prop="userEmail" label="邮箱">
			</el-table-column>
			<el-table-column label="操作" fixed="right">
				<template scope="scope">
					<!-- <el-button size="small" @click="handleEditMM(scope.$index, scope.row)">修改密码</el-button> -->
					<el-button size="small" @click="handleEditXX(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>




		<!--新增界面-->
		<el-dialog title="新增" 
		:visible.sync="addFormVisible"
		ref="addForm">
			<el-form :model="addFormData" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="账号" prop="userAccount">
					<el-input v-model="addFormData.userAccount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="userPassword">
					<el-input v-model="addFormData.userPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="useName">
					<el-input v-model="addFormData.useName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="userEmail">
					<el-input v-model="addFormData.userEmail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" prop="companyId">
					<el-select v-model="addFormData.companyId" placeholder="请选择所在公司" @change = "getDepartmentByComId(addFormData.companyId)">
					    <el-option
					      v-for="item in companyData"
					      :key="item.companyId"
					      :label="item.companyName"
					      :value="item.companyId">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="departmentId">
					<el-select v-model="addFormData.departmentId" placeholder="请选择所在部门" >
					    <el-option
					      v-for="item in  departmentData"
					      :key="item.departmentId"
					      :label="item.departmentName"
					      :value="item.departmentId"
					      >
					    </el-option>
					 </el-select>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('addForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--修改界面-->
		<el-dialog title="修改" 
		:visible.sync="editXXFormVisible"
		ref="editXXForm">
			<el-form :model="editMMFormSendData" label-width="80px"  ref="editXXForm">
				<el-form-item label="账号" prop="userAccount">
					<el-input v-model="editMMFormSendData.userAccount" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="密码" prop="userPassword">
					<el-input v-model="editMMFormSendData.userPassword" auto-complete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="姓名" prop="useName">
					<el-input v-model="editMMFormSendData.useName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="userEmail">
					<el-input v-model="editMMFormSendData.userEmail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" prop="companyId">
					<el-select v-model="editMMFormSendData.companyId" placeholder="请选择所在公司" @change = "getDepartmentByComId(editMMFormSendData.companyId)">
					    <el-option
					      v-for="item in companyData"
					      :key="item.companyId"
					      :label="item.companyName"
					      :value="item.companyId">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="departmentId">
					<el-select v-model="editMMFormSendData.departmentId" placeholder="请选择所在部门" >
					    <el-option
					      v-for="item in  departmentData"
					      :key="item.departmentId"
					      :label="item.departmentName"
					      :value="item.departmentId"
					      >
					    </el-option>
					 </el-select>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editXXFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('editXXForm')" >提交</el-button>
			</div>
		</el-dialog>


		<!--修改界面-->
		<!-- <el-dialog title="修改" 
		:visible.sync="editMMFormVisible"
		ref="editFormDialog">
			<el-form :model="editMMFormSendData" label-width="150px" ref="editMMForm" >
				<el-form-item label='请输入密码'>
					<el-input v-model="editMMFormData.user" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label='请输入新密码'>
					<el-input v-model="editMMFormData.userAccount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label='请再次输入新密码'>
					<el-input v-model="editMMFormData.userAccount" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitMMForm()" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog> -->
		

	</div>
</template>
<script>
	export default{
		data(){
			return{
				//
				registerUrl:API_URL['DO_REGESTER'],
				users:[],
				listLoading: false,

				getCompanyUrl:API_URL['GET_COMPANY'],
				companyData: [],

				getDepartUrl:API_URL['GET_DEPTMENT'],
				departmentData: [],

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormData:{
					userUserId:null,
					userAccount:null,
					userPassword:null,
					userName:null,
					companyId:null,
					userEmail:null,
					departmentId:null,
				},
				addFormRules: {
					userAccount: [
						{ required: true, message: '请输入账号'}
					],
					userPassword: [
						{ required: true, message: '请输入密码'}
					],
					useName: [
						{ required: true, message: '请输入姓名'}
					],
					companyId: [
						{ required: true, message: '请选择公司'}
					],
					departmentId: [
						{ required: true, message: '请选择部门'}
					]
				},

				//编辑界面是否显示

				editMMFormVisible: false,
				editXXFormVisible: false,
				editLoading: false,
				
				editMMFormSendData:{
					userUserId:null,
					userAccount:null,
					userPassword:null,
					userName:null,
					companyId:null,
					userEmail:null,
					departmentId:null,
				},
				editXXFormSendData:{

				},
				
			}
		},
		methods:{
			handleEditXX(index, row){
				
				this.editMMFormSendData = Object.assign({},row)
				this.editXXFormVisible = true
				
			},
			getDepartmentByComId(id){
				this.$axios.get(this.getDepartUrl+id).then((res)=>{
					var result = res.data
					console.log(result)
					if(result.ok){
						this.departmentData = result.data
					}else{
						alert('获取部门数据失败')
					}
				})
			},
			getCompanyData(){

				this.$axios.get(this.getCompanyUrl).then((res)=>{
					var result = res.data
					console.log(result)
					if(result.ok){
						this.companyData = result.data
					}else{
						alert('获取公司数据失败')
					}
				})
			},
			getAllData(){
				this.$axios.get(API_URL['GET_USER_LIST']).then((res)=>{
					const result = res.data
					console.log(result)
					if(result.ok){
						this.users = this.handleData(result.data)
					}else {
						alert('获取用户列表失败')
					}
				})
			},
			submitForm(formName){
				this.$refs[formName].validate((valid)=>{
					if(valid){
						this.$axios.post(this.registerUrl,this.addFormData).then((res)=>{
							var result = res.data
							if(result.ok){
								this.$alert('添加成功', '提示', {
          							confirmButtonText: '确定',
          							callback: () => {
          							  window.location.reload()
          							}
        						});
							}else{
								alert(result.msg)
							}
						})
					}else{

					}
				})
			},
			
			handleData(datas){
				datas = Object.prototype.toString.call(datas) == '[object Array]'? datas : [datas]

				const _data = []
				for(let i=0; i< datas.length; i++){
					const row_data = datas[i]
					const _row_data = {
						userUserId:row_data.userUserId,
						userAccount:row_data.userAccount,
						userPassword:row_data.userPassword,
						userName:row_data.userName,
						companyId:row_data.companyId,
						userEmail:row_data.userEmail,
						departmentId:row_data.departmentId,
					}
					_data.push(_row_data)
				}

				return _data
			},
		},
		mounted(){
			this.getCompanyData()
			this.getAllData()
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



</style>
