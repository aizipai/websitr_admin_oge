<template>
	<div>
		<div class="b-top">
			<div class="t-tit">导游</div>
			<el-button 
				class="add-user"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>



		<!--列表-->
		<el-table :data="touristData" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="id" label="ID">
			</el-table-column>
			<el-table-column prop="name-c" label="中文姓名" >
			</el-table-column>
			<el-table-column prop="name-e" label="英文姓名" >
			</el-table-column>
			<el-table-column prop="age" label="年龄" >
			</el-table-column>
			<el-table-column prop="sex" label="性别"  >
			</el-table-column>
			<el-table-column prop="position" label="职位" >
			</el-table-column>
			<el-table-column prop="account" label="账号">
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
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="旅游团级别" prop="level">
					<el-input v-model="addForm.level" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="中文姓名" prop="name-c">
					<el-input v-model="addForm.name_c" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文姓名" prop="name-e">
					<el-input v-model="addForm.name_e" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="导游资格证">
					<el-upload
				  class="upload-demo"
				  ref="upload"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="addForm.fileList"
				  :auto-upload="false">
				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				</el-upload>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('addForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				//
				touristData:[
					{
						id: 1,
						name_c: 'dudu',
						name_e: '12345678901',
						age: 'dudududu',
						sex: 'laoda',
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
					count: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					phone: '',
					company: '',
					position: '',
					count: '',
					fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
			submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
