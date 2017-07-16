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
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;"  max-height="500">
			<el-table-column  align='center' prop="guideId" label="导游ID" >
			</el-table-column>
			<el-table-column  align='center' prop="tourLevel" label="旅游团级别">
				<template scope = 'scope'>
					<span v-text='scope.row.tourLevel == 0? "普通" : "高端"'></span>
				</template>
			</el-table-column>
			<el-table-column  align='center' prop="nameC" label="中文姓名" >
			</el-table-column>
			<el-table-column  align='center' prop="nameE" label="英文姓名" >
			</el-table-column>
			<el-table-column  align='center' prop="guideAge" label="年龄">
			</el-table-column>
			<el-table-column  align='center' prop="guideExperiences" label="工作经验">
			</el-table-column>
			<el-table-column  align='center' prop="guideGender" label="性别" >
				<template scope = 'scope'>
					<span v-text='scope.row.tourLevel == 0? "女" : "男"'></span>
				</template>
			</el-table-column>
			<el-table-column  align='center' prop="guideLicense" label="资格证">
				<template scope='scope'>
					<template v-for='src in scope.row.guideLicense'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}"
						@click='showBigImg(src)'>
					</template>
				</template>	
			</el-table-column>
			<el-table-column  align='center' prop="guideSelfPicture" label="导游照片">
				<template scope='scope'>
					<template v-for='src in scope.row.guideSelfPicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}"
						@click='showBigImg(src)'>
					</template>
				</template>
			</el-table-column>
			<el-table-column  align='center' prop="guidePicture" label="照片">
				<template scope='scope'>
					<template v-for='src in scope.row.guidePicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}"
						@click='showBigImg(src)'>
					</template>
				</template>
			</el-table-column>
			<el-table-column  align='center' prop="guideSelfDescription" label="自我介绍" show-overflow-tooltip width='300px'>
			</el-table-column>
			<el-table-column  align='center' label="操作" width='150' fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--新增界面-->
		<el-dialog title="新增" 
		:visible.sync="addFormVisible"
		ref="addFormDialog">
			<el-form :model="addFormSendData" label-width="100px" ref="addForm">
				<el-form-item label="旅游团级别">
					<el-select v-model="addFormSendData.tourLevel" placeholder="请选择旅游团级别">
 					   <el-option
 					     v-for="item in tourLevelData"
 					     :key="item.value"
 					     :label="item.label"
 					     :value="item.value">
 					   </el-option>
 					 </el-select>
				</el-form-item>
				<!-- <el-form-item label="所在地区">
					<el-select v-model="addFormSendData.hotelAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item> -->
				<el-form-item label="中文姓名">
					<el-input v-model="addFormSendData.nameC"></el-input>
				</el-form-item>
				<el-form-item label="英文姓名">
					<el-input v-model="addFormSendData.nameE"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addFormSendData.guideAge" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addFormSendData.guideGender">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="经验">
					<el-input-number v-model="addFormSendData.guideExperiences" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="导游资格证">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs1'></upload-imgs>
				</el-form-item>
				<el-form-item label="导游照片">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs2'></upload-imgs>
				</el-form-item>
				<el-form-item label="照片">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs3'></upload-imgs>
				</el-form-item>
				<el-form-item label="自我介绍">
  				  <el-input type="textarea" v-model="addFormSendData.guideSelfDescription"></el-input>
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
		ref="editFormDialog">
			<el-form :model="editFormSendData" label-width="100px" ref="editForm">
				<el-form-item label="旅游团级别">
					<el-select v-model="editFormSendData.tourLevel" placeholder="请选择旅游团级别">
 					   <el-option
 					     v-for="item in tourLevelData"
 					     :key="item.value"
 					     :label="item.label"
 					     :value="item.value">
 					   </el-option>
 					 </el-select>
				</el-form-item>
				<!-- <el-form-item label="所在地区">
					<el-select v-model="editFormSendData.hotelAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item> -->
				<el-form-item label="中文姓名">
					<el-input v-model="editFormSendData.nameC"></el-input>
				</el-form-item>
				<el-form-item label="英文姓名">
					<el-input v-model="editFormSendData.nameE"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editFormSendData.guideAge" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editFormSendData.guideGender">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="经验">
					<el-input-number v-model="editFormSendData.guideExperiences" :min="20" :max="30"></el-input-number>
				</el-form-item>
				<el-form-item label="导游资格证">
					<upload-imgs 
					:existImgList='existImgList1'
					@uploadedImgs='handleUploadedImgs1'></upload-imgs>
				</el-form-item>
				<el-form-item label="导游照片">
					<upload-imgs 
					:existImgList='existImgList2'
					@uploadedImgs='handleUploadedImgs2'></upload-imgs>
				</el-form-item>
				<el-form-item label="照片">
					<upload-imgs 
					:existImgList='existImgList3'
					@uploadedImgs='handleUploadedImgs3'></upload-imgs>
				</el-form-item>
				<el-form-item label="自我介绍">
  				  <el-input type="textarea" v-model="editFormSendData.guideSelfDescription"></el-input>
  				</el-form-item>
				
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('editForm')" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<el-dialog v-model="imgDialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
	import UploadImgs from '../../components/UploadImgs.vue'
	export default{
		components:{
			UploadImgs
		},
		data(){
			return{
				dialogImageUrl:'',
				imgDialogVisible: false,

				
				getAllDataUrl: API_URL['GET_TOUR_LIST'],
				getAllDataParams: {
					page: 1,
					limit: 10
				},
				imgWidth:'100px',
				imgHeight:'100px',
				reGetCount: 5,//获取失败重复获取数据次数
				upLoadUrl:API_URL['UPLOAD_IMG'],
				existImgList1:[],//存在的图片
				existImgList2:[],//存在的图片
				existImgList3:[],//存在的图片
				imgsArr1:[],//上传的所有图片
				imgsArr2:[],//上传的所有图片
				imgsArr3:[],//上传的所有图片

				allData:[],


				listLoading:false,
				tourLevelData:[
					{value: 1,label: '高端'},
					{value: 0,label: '普通'}
				],
				hotelArea: [
					
				],
				addLoading:false,

				//新增部分所用数据
				addFormVisible: false,

				addFormUrl: API_URL['ADD_TOUR'],
				addFormSendData:{
					guideId:null,
					guidePicture:null,
					guideSelfPicture:null,
					guideLicense:null,
					guideName:null,
					nameC:null,
					nameE:null,
					guideAge:null,
					guideExperiences:null,
					guideGender:null,
					guideSelfDescription:null,
					tourLevel:null,
				},

				//上传图片部分
				dialogVisible: false,

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					guideId:null,
					guidePicture:null,
					guideSelfPicture:null,
					guideLicense:null,
					guideName:null,
					nameC:null,
					nameE:null,
					guideAge:null,
					guideExperiences:null,
					guideGender:null,
					guideSelfDescription:null,
					tourLevel:null
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:API_URL['ADD_TOUR'],

				//删除
				delUrl:API_URL['DEL_TOUR'],

			
				
			}
		},
		methods:{
			showBigImg(src){
				this.dialogImageUrl = src,
				this.imgDialogVisible = true
			},
			handleUploadedImgs1(uploadedImgs){
				this.imgsArr1 = uploadedImgs
				console.log(this.imgsArr1)
			},
			handleUploadedImgs2(uploadedImgs){
				this.imgsArr2 = uploadedImgs
			},
			handleUploadedImgs3(uploadedImgs){
				this.imgsArr3 = uploadedImgs
			},
			getHotelArea(){

				this.$axios.get(API_URL['GET_AREA']).then((res)=>{
					if(res.data.ok){
						this.hotelArea = res.data.data
						console.log(res.data)
					}else{
						console.log('获取地区失败')
					}
				})
			},
			
			handleDel(index, row){
				var id = row.guideId
				

				this.$confirm('确定删除？', '提示', {
        		  confirmButtonText: '确定',
        		  cancelButtonText: '取消',
        		  type: 'warning'
        		}).then(() => {
        			this.$axios.get(this.delUrl+id).then((res)=>{
					var result = res.data
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

        		}).catch(() => {
        		  this.$message({
        		    type: 'info',
        		    message: '已取消删除'
        		  });          
        		});	

			},
			handleEdit(index, row){
				
				this.editFormSendData = Object.assign({},row)

				this.existImgList1 = row.guideLicense
				this.existImgList2 = row.guideSelfPicture
				this.existImgList3 = row.guidePicture

				this.editFormVisible = true
				
			},
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						console.log(this.imgsArr1)
				this[_params]['guideLicense'] = this.arrToStr(this.imgsArr1) || this.arrToStr(this.existImgList1)		
				this[_params]['guideSelfPicture'] = this.arrToStr(this.imgsArr2) || this.arrToStr(this.existImgList2)		
				this[_params]['guidePicture'] = this.arrToStr(this.imgsArr3) || this.arrToStr(this.existImgList3)	

				this[_params]['guideName']	= this[_params]['nameC'] +'/'+	this[_params]['nameE']		

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
			getAllData(){
				this.listLoading = true
				this.$axios.get(this.getAllDataUrl,this.getAllDataParams).then((res)=>{
					this.listLoading = false
					var result = res.data
					this.allData = this.handleData(result.data)
				})
			},
			handleData(datas){
				datas = Object.prototype.toString.call(datas) == '[object Array]'? datas : [datas]

				const _data = []
				for(let i=0; i< datas.length; i++){
					const row_data = datas[i]
					const _row_data = {
						guideId:row_data.guideId,
						guideName:row_data.guideName,
						nameC:row_data.guideName.split('/')[0] || '中文',
						nameE:row_data.guideName.split('/')[1] || 'eng',
						guideAge:row_data.guideAge,
						guideExperiences:row_data.guideExperiences,
						guideGender:parseInt(row_data.guideGender),
						guideSelfDescription:row_data.guideSelfDescription,
						tourLevel:row_data.tourLevel,
						guidePicture: row_data.guidePicture?row_data.guidePicture.split(',') : [],
						guideSelfPicture: row_data.guideSelfPicture?row_data.guideSelfPicture.split(',') : [],
						guideLicense: row_data.guideLicense?row_data.guideLicense.split(',') : [],
					}
					_data.push(_row_data)
				}

				return _data
			},
			arrToStr(arr,fenge=','){
				console.log(arr)
				return arr.join(fenge)
			},
		},
		mounted(){
			this.getAllData()
			// this.getHotelArea()
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
