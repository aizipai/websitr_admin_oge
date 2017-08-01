<template>
	<div>
		<div class="b-top">
			<div class="t-tit">游轮</div>
			<el-button 
				class="add-res"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;" max-height="500">
			<el-table-column align='center' prop="cruisesId" label="ID">
			</el-table-column>
			<el-table-column align='center' prop="tourLevel" label="旅游团级别">
				<template scope = 'scope'>
					<span>{{scope.row.tourLevel|handleLevel}}</span>
				</template>
			</el-table-column>
			<el-table-column align='center' prop="cruisesName" label="游轮名称">
			</el-table-column>
			<el-table-column align='center' prop="cruisesFacilities" label="游轮设施">
			</el-table-column>
			<el-table-column align='center' prop="cruisesHomeNum" label="游轮总房间数">
			</el-table-column>
			<el-table-column align='center' prop="cruisesSimpleNum" label="游轮单人间数量">
			</el-table-column>
			<el-table-column align='center' prop="cruisesDoubleNum" label="游轮双人间数量">
			</el-table-column>
			
			<el-table-column align='center' prop="cruisesLong" label="游轮长(米)">
			</el-table-column>
			<el-table-column align='center' prop="cruisesWidth" label="游轮宽(米)">
			</el-table-column>
			<el-table-column align='center' prop="cruisesHeight" label="游轮高(米)">
			</el-table-column>
			<el-table-column align='center' prop="cruisesIchnography" label="游轮平面图">
				<!-- <template scope='scope'>
					<template v-for='src in scope.row.cruisesIchnography'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}" @click='showBigImg(src)'>
					</template>
				</template>	 -->
				<template scope='scope'> 
					<DialogCarousel :pictures='scope.row.cruisesIchnography'></DialogCarousel>
				</template>	
			</el-table-column>
			<el-table-column align='center' prop="cruisesPicture" label="游轮图片">
				<!-- <template scope='scope'>
					<template v-for='src in scope.row.cruisesPicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}" @click='showBigImg(src)'>
					</template>
				</template>	 -->
				<template scope='scope'> 
					<DialogCarousel :pictures='scope.row.cruisesPicture'></DialogCarousel>
				</template>
			</el-table-column>
			<el-table-column align='center' label="操作" width="150"  fixed="right">
				<template scope="scope">
					<el-button size="small" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		
		<!--新增界面-->
		<el-dialog title="新增" 
		:visible.sync="addFormVisible"
		ref="addFormDialog">
			<el-form :model="addFormSendData" label-width="150px" ref="addForm" >
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
				
				<el-form-item label="游轮名称">
					<el-input v-model="addFormSendData.cruisesName" placeholder="请输入游轮名称"></el-input>
				</el-form-item>
				<el-form-item label="游轮设施">
					<el-input v-model="addFormSendData.cruisesFacilities" placeholder="请输入游轮设施"></el-input>
				</el-form-item>
				<el-form-item label="游轮总房间数">
					<el-input-number v-model="addFormSendData.cruisesHomeNum" placeholder="请输入游轮总房间数" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮单人间数量">
					<el-input-number v-model="addFormSendData.cruisesSimpleNum" placeholder="请输入游轮单人间数量" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮双人间数量">
					<el-input-number v-model="addFormSendData.cruisesDoubleNum" placeholder="请输入游轮双人间数量" :min="0"></el-input-number>
				</el-form-item>
				
				<el-form-item label="游轮长">
					<el-input-number v-model="addFormSendData.cruisesLong" :controls="false" placeholder="请输入游轮长" :min="0"></el-input-number>(单位:米)
				</el-form-item>
				<el-form-item label="游轮宽">
					<el-input-number  v-model="addFormSendData.cruisesWidth" :controls="false"
					placeholder="请输入游轮宽"
					:min='0'></el-input-number >(单位:米)
				</el-form-item>
				<el-form-item label="游轮高">
					<el-input-number  v-model="addFormSendData.cruisesHeight" :controls="false"
					placeholder="请输入游轮高"
					:min='0'></el-input-number >(单位:米)
				</el-form-item>
				<el-form-item label="游轮平面图">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
				</el-form-item>
				<el-form-item label="游轮图片">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs2'></upload-imgs>
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
			<el-form :model="editFormSendData" label-width="150px" ref="editForm" >
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
				
				<el-form-item label="游轮名称">
					<el-input v-model="editFormSendData.cruisesName" placeholder="请输入游轮名称"></el-input>
				</el-form-item>
				<el-form-item label="游轮设施">
					<el-input v-model="editFormSendData.cruisesFacilities" placeholder="请输入游轮设施"></el-input>
				</el-form-item>
				<el-form-item label="游轮总房间数">
					<el-input-number v-model="editFormSendData.cruisesHomeNum" placeholder="请输入游轮总房间数" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮单人间数量">
					<el-input-number v-model="editFormSendData.cruisesSimpleNum" placeholder="请输入游轮单人间数量" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮双人间数量">
					<el-input-number v-model="editFormSendData.cruisesDoubleNum" placeholder="请输入游轮双人间数量" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮平面图">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
				</el-form-item>
				<el-form-item label="游轮图片">
					<upload-imgs 
					:existImgList='existImgList2'
					@uploadedImgs='handleUploadedImgs2'></upload-imgs>
				</el-form-item>
				<el-form-item label="游轮长">
					<el-input-number v-model="editFormSendData.cruisesLong" :controls="false" placeholder="请输入游轮长" :min="0"></el-input-number>(单位:米)
				</el-form-item>
				<el-form-item label="游轮宽">
					<el-input-number  v-model="editFormSendData.cruisesWidth" :controls="false"
					placeholder="请输入游轮宽"
					:min='0'></el-input-number >(单位:米)
				</el-form-item>
				<el-form-item label="游轮高">
					<el-input-number  v-model="editFormSendData.cruisesHeight" :controls="false"
					placeholder="请输入游轮高"
					:min='0'></el-input-number >(单位:米)
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
	import DialogCarousel from '../../components/DialogCarousel.vue'
	export default{
		components:{
			UploadImgs,
			DialogCarousel
		},
		data(){
			
			return{
				dialogImageUrl:'',
				imgDialogVisible: false,

				getAllDataUrl: API_URL['GET_CRU_LIST'],
				getAllDataParams: {
					page: 1,
					limit: 10
				},
				imgWidth:'100px',
				imgHeight:'100px',
				reGetCount: 5,//获取失败重复获取数据次数
				upLoadUrl:API_URL['UPLOAD_IMG'],
				existImgList:[],//存在的图片
				existImgList2:[],//存在的图片
				imgsArr:[],//上传的所有图片
				imgsArr2:[],//上传的所有图片

				allData:[],


				listLoading:false,
				tourLevelData:[
					{value: 2,label: '全部'},
					{value: 1,label: '高端'},
					{value: 0,label: '标准'}
				],
				hotelArea: [
					
				],
				addLoading:false,

				//新增部分所用数据
				addFormVisible: false,

				addFormUrl: API_URL['ADD_CRU'],
				addFormSendData:{
					cruisesId:null,
					cruisesName:null,
					cruisesPicture:null,
					cruisesHomeNum:null,
					cruisesDoubleNum:null,
					cruisesSimpleNum:null,
					cruisesFacilities:null,
					cruisesLong:null,
					cruisesHeight:null,
					cruisesWidth:null,
					cruisesIchnography:null,
					tourLevel:null,
				},

				//上传图片部分
				pictureArr: [],
				dialogVisible: false,

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					cruisesId:null,
					cruisesName:null,
					cruisesPicture:null,
					cruisesHomeNum:null,
					cruisesDoubleNum:null,
					cruisesSimpleNum:null,
					cruisesFacilities:null,
					cruisesLong:null,
					cruisesHeight:null,
					cruisesWidth:null,
					cruisesIchnography:null,
					tourLevel:null,
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:API_URL['ADD_CRU'],

				//删除
				delUrl:API_URL['DEL_CRU']

			}
		},
		methods:{
			showBigImg(src){
				this.dialogImageUrl = src,
				this.imgDialogVisible = true
			},

			handleUploadedImgs(uploadedImgs){
				this.imgsArr = uploadedImgs
			},
			handleUploadedImgs2(uploadedImgs){
				this.imgsArr2 = uploadedImgs
			},
			handleDel(index, row){
				var id = row.cruisesId
				

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
          					   for(item in this.addFormSendData){
          					  	item = null
          					  }
          					  for(item in this.editFormSendData){
          					  	item = null
          					  }
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
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						
				this[_params]['cruisesIchnography'] = this.arrToStr(this.imgsArr) || this.arrToStr(this.existImgList)				
				this[_params]['cruisesPicture'] = this.arrToStr(this.imgsArr2) || this.arrToStr(this.existImgList2)					

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
			handleEdit(index, row){
				
				this.editFormSendData = Object.assign({},row)

				this.existImgList = row.cruisesIchnography
				this.existImgList2 = row.cruisesPicture

				this.editFormVisible = true
				
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
						cruisesId:row_data.cruisesId,
						cruisesName:row_data.cruisesName,
						cruisesHomeNum:row_data.cruisesHomeNum,
						cruisesDoubleNum:row_data.cruisesDoubleNum,
						cruisesSimpleNum:row_data.cruisesSimpleNum,
						cruisesLong:row_data.cruisesLong,
						cruisesHeight:row_data.cruisesHeight,
						cruisesWidth:row_data.cruisesWidth,
						tourLevel:row_data.tourLevel,
						cruisesFacilities:row_data.cruisesFacilities,
						cruisesPicture: row_data.cruisesPicture?row_data.cruisesPicture.split(',') : [],
						cruisesIchnography: row_data.cruisesIchnography?row_data.cruisesIchnography.split(',') : [],

					}
					_data.push(_row_data)
				}

				return _data
			},
			arrToStr(arr,fenge=','){
				return arr.join(fenge)
			},
		},
		mounted(){
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
		.add-res
			padding 8px 30px
			margin-left 30px	



</style>
