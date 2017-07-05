<template>
	<div>
		<div class="b-top">
			<div class="t-tit">酒店</div>
			<el-button 
				class="b-add"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>



		<!--列表-->
		<el-table :data="hotels" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="id" label="ID" width='70'>
			</el-table-column>
			<el-table-column prop="name" label="酒店名称">
			</el-table-column>
			<el-table-column prop="picture" label="酒店图片" width='700'>
				<template scope="lineInfo">
					<img :src="lineInfo.row.img" width="500px" height="auto">
				</template>
			</el-table-column>

			<el-table-column label="操作">
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
				<el-form-item label="上传图片" prop="img">
					<el-upload
			 			class="picture-uploader"
			 			action="https://jsonplaceholder.typicode.com/posts/"
			 			:show-file-list="false"
			 			:on-success="handleAvatarSuccess"
			 			:before-upload="beforeAvatarUpload">
			 			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			 			<i v-else class="el-icon-plus picture-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
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
				hotels:[
					{
						id: 1,
						name: '大酒店',
						img: 'http://i1.buimg.com/1949/0693afa5c05559a5.png'
					}
				],
				listLoading: false,

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					img_url: ''
				},
				imageUrl: ''
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
			handleAvatarSuccess(){
				this.img_url = ''
			},
			beforeAvatarUpload(){

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
		.b-add
			padding 8px 30px
			margin-left 30px	

	.picture-uploader
		width 150px
		height 150px	
		line-height 150px
		border 1px dashed #ccc
		text-align center
		
		.picture-uploader-icon
			font-size 50px
			width 150px
			height 150px
			

	.dialog-footer
		text-align center
			
</style>
