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
			<el-table-column prop="guideId" label="导游ID">
			</el-table-column>
			<el-table-column prop="tourLevel" label="旅游团级别">
			</el-table-column>
			<el-table-column prop="status" label="status" >
			</el-table-column>
			<el-table-column prop="nameC" label="中文姓名" >
			</el-table-column>
			<el-table-column prop="nameE" label="资格证" >
			</el-table-column>
			<el-table-column prop="guideExperiences" label="工作经验"  >
			</el-table-column>
			<el-table-column prop="guideGender" label="性别" >
			</el-table-column>
			<el-table-column prop="guidePicture" label="guidePicture">
			</el-table-column>
			<el-table-column prop="guideSelfDescription" label="自我介绍">
			</el-table-column>
			<el-table-column prop="guideSelfPicture" label="guideSelfPicture">
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
			<el-form :model="addForm" label-width="100px" ref="addForm">
				<el-form-item label="旅游团级别">
					<el-select v-model="addForm.tourLevel" placeholder="请选择旅游团级别">
 					   <el-option
 					     v-for="item in tourLevelData"
 					     :key="item.value"
 					     :label="item.label"
 					     :value="item.value">
 					   </el-option>
 					 </el-select>
				</el-form-item>
				<el-form-item label="中文姓名">
					<el-input v-model="addForm.nameC"></el-input>
				</el-form-item>
				<el-form-item label="英文姓名">
					<el-input v-model="addForm.nameE"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.guideAge" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.guideGender">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="经验">
					<el-input-number v-model="addForm.guideExperiences" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="导游资格证">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureWorkPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="导游照片">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureSelfPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogSelfImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="自我介绍">
  				  <el-input type="textarea" v-model="addForm.guideSelfDescription"></el-input>
  				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('addForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--修改界面-->
		<el-dialog title="修改" 
		:visible.sync="editFormVisible"
		ref="editForm">
			<el-form :model="editForm" label-width="100px" ref="addForm">
				<el-form-item label="旅游团级别">
					<el-select v-model="editForm.tourLevel" placeholder="请选择旅游团级别">
 					   <el-option
 					     v-for="item in tourLevelData"
 					     :key="item.value"
 					     :label="item.label"
 					     :value="item.value">
 					   </el-option>
 					 </el-select>
				</el-form-item>
				<el-form-item label="中文姓名">
					<el-input v-model="editForm.nameC"></el-input>
				</el-form-item>
				<el-form-item label="英文姓名">
					<el-input v-model="editForm.nameE"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.guideAge" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.guideGender">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="经验">
					<el-input-number v-model="editForm.guideExperiences" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="导游资格证">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureWorkPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="导游照片">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureSelfPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogSelfImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="自我介绍">
  				  <el-input type="textarea" v-model="editForm.guideSelfDescription"></el-input>
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
				touristData:[
					
				],
				pageCount: 0,
				listLoading: false,

				page: 1,
				limit: 10,


				tourLevelData:[
						{
							value: 1,
							label: '高端'
						},
						{
							value: 2,
							label: '普通'
						}
					],

				//新增界面
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					
				},
				//新增界面数据
				addForm: {
					tourLevel: 1,
					nameC:'',
					nameE:'',
					guideAge:'',
					guideGender: 1,
					guideExperiences: '',
					guideSelfPictrue: [],
					guideLicense: [],
					guideSelfDescription:'自我介绍',

					fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
				},
				dialogWorkImageUrl: '',
				dialogSelfImageUrl: '',
				dialogVisible: false,

				//编辑页面
				editFormVisible: false,//编辑页面是否显示
				editLoading: false,
				editFormRules: {
					
				},
				//编辑页面数据
				editForm: {},
				dialogWorkImageUrl: '',
				dialogSelfImageUrl: '',
				dialogVisible: false,

				
			}
		},
		methods:{
			handleEdit(index,row){
				this.editFormVisible = true


				this.editForm =Object.assign({},row)
			},
			submitForm(formName){
				this.$refs[formName].validate((valid)=>{
					if(valid){
						var params = {
							tourLevel:this.addForm.tourLevel,
							guideName: this.addForm.nameC +'/' + this.addForm.nameE,
							guideAge: this.addForm.guideAge,
							guideGender: this.addForm.guideGender,
							guideExperiences: this.addForm.guideExperiences,
							guideSelfDescription: this.addForm.guideSelfDescription,
							guideSelfPictrue: "['1,jpg','2.jpg']",
							guideLicense: '2.jpg',
							guidePictrue: '3.jpg'
						}
						this.$axios.post('/api/guide/addFormValue',params).then((res)=>{
							let result = res.data
							if(result.ok){
								alert('成功！')
								window.location.reload()
							}else{
								alert(result.msg)
								window.location.reload()
							}
						})
					}else{
						console.log('error submit!')
						return false
					}
				})
			},
     		handleRemove(file, fileList) {
     			console.log(file)
     			console.log(fileList)
     		},
     		handlePictureSelfPreview(file) {
     		  this.dialogSelfImageUrl = file.url;
     		  this.dialogVisible = true;
     		  this.guideSelfPictrue.push(file.url)
     		},
     		handlePictureWorkPreview(file) {
     		  this.dialogWorkImageUrl = file.url;
     		  this.dialogVisible = true;
     		  this.guideLicense.push(file.url)
     		},
     		getGuides(){
     			var params = {page:this.page,limit: this.limit}
     			this.$axios.get('/api/guide/findAllGuide',params).then((res)=>{
     				let result = res.data
     				if(result.ok){
     					console.log(result.data)
     					this.pageCount = result.data.length
     					this.touristData = this.handleData(result.data)
     					console.log(this.touristData)
     				}else{
     					alert(result.msg)
     				}
     			})
     		},
     		handleData(originData){
     			originData = Object.prototype.toString.call(originData) == '[object Array]'?originData:[originData]
     			let after_handle = []
     			for(let i=0; i<originData.length; i++){
     				var row = originData[i]

					var _row = {

					tourLevel:row.tourLevel,
					nameC: row.guideName.split('/')[0],
					nameE: row.guideName.split('/')[1],
					guideId:row.guideId,
					guideAge: row.guideAge,
					guideGender: row.guideGender,
					guideExperiences: row.guideExperiences,
					guideSelfPictrue: row.guideSelfPictrue,
					guideLicense: row.guideLicense,
					guideSelfDescription: row.guideSelfDescription,
					guidePicture:row.guidePicture,
					status:row.status
					}

					after_handle.push(_row)
     			}

     			return after_handle
     		}
		},
		mounted(){
			this.getGuides()
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
