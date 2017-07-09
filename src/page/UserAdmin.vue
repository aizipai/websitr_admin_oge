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
		<el-table :data="users" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="id" label="ID" width="55">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" >
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="150" >
			</el-table-column>
			<el-table-column prop="company" label="公司名称" width="200" >
			</el-table-column>
			<el-table-column prop="position" label="职位" width="120" >
			</el-table-column>
			<el-table-column prop="account" label="账号" min-width="180" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
				<el-form-item label="公司" prop="companyId">
					<el-select v-model="addFormData.companyId" placeholder="请选择所在公司" @change = "getDepartmentByComId(addFormData.companyId)">
					    <el-option
					      v-for="item in companyData"
					      :key="item.companyId"
					      :label="item.companyName"
					      :value="item.companyId"
					      >
					    </el-option>
					 </el-select>
				</el-form-item>
				<el-form-item label="部门" prop="companyId">
					<!-- <el-select v-model="addFormData.departmentId" placeholder="请选择所在部门"> -->
					   <!--  <el-option
					      v-for="item in deparData"
					      :key="item.companyId"
					      :label="item.companyName"
					      :value="item.companyId">
					    </el-option> -->
					 <!-- </el-select> -->
					 <el-input v-model="addFormData.departmentId"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('addForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!-- 删除界面 -->

		<el-dialog title="新增" 
		:visible.sync="editFormVisible"
		ref="editForm">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="editForm.phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" prop="company">
					<el-input v-model="editForm.company" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="position">
					<el-input v-model="editForm.position" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="account">
					<el-input v-model="editForm.account" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('editForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				//
				registerUrl:'/api/user/register', 
				users:[],
				listLoading: false,

				getCompanyUrl:'/api/company/getCompany',
				companyData: [],

				getDepartUrl:'/api/company/getCompany',
				deparData: [],

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormData:{
					userAccount:'',
					userPassword:'',
					useName:'',
					companyId:'',
					departmentId:1,
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
				editFormVisible: false,
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入电话号码', trigger: 'blur' }
					],
					company: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' }
					],
					position: [
						{ required: true, message: '请输入职位', trigger: 'blur' }
					],
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					name: '',
					phone: '',
					company: '',
					position: '',
					account: '',
				}
			}
		},
		methods:{
			getDepartmentByComId(id){
				console.log(id)
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
							}
						})
					}else{

					}
				})
			},
			handleEdit(index, row){
				this.editFormVisible = true
				this.editForm = Object.assign({}, row)
				console.log(index)
				console.log(row)
			}
		},
		mounted(){
			this.getCompanyData()
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
