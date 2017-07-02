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
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="addForm.phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" prop="company">
					<el-input v-model="addForm.company" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="position">
					<el-input v-model="addForm.position" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="account">
					<el-input v-model="addForm.account" auto-complete="off"></el-input>
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
				users:[
					{
						id: 1,
						name: 'dudu',
						phone: '12345678901',
						company: 'dudududu',
						position: 'laoda',
						account: '4321'
					}
				],
				listLoading: false,

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
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
				//新增界面数据
				addForm: {
					name: '',
					phone: '',
					company: '',
					position: '',
					account: ''
				},

				editFormVisible: false,//编辑界面是否显示
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
			submitForm(formName){
				this.$refs[formName].validate((valid)=>{
					if(valid){
						alert('submit')
					}else{
						console.log('error submit!')
						return false
					}
				})
			},
			handleEdit(index, row){
				this.editFormVisible = true
				this.editForm = Object.assign({}, row)
				console.log(index)
				console.log(row)
			}
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
