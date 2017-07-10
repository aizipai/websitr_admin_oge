<template>
	<div>
		<div class="b-top">
			<div class="t-tit">酒店</div>
			<el-button 
				class="add-hotel"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;"  max-height="500">
			<el-table-column align='center' prop="hotelId" label="id" class='hide'>
			</el-table-column>
			<el-table-column align='center' prop="tourLevel" label="旅游团级别">
				<template scope = 'scope'>
					<span v-text='scope.row.tourLevel == 0? "普通" : "高端"'></span>
				</template>
			</el-table-column>
			<el-table-column align='center' prop="hotelAreaId" label="所在地区">
			</el-table-column>
			<el-table-column align='center' prop="hotelName" label="酒店名称">
			</el-table-column>
			<el-table-column align='center' prop="hotelHomeNum" label="房间数量">
			</el-table-column>
			<el-table-column align='center' prop="hotelCharteredRoomNum" label="包房数量">
			</el-table-column>
			<el-table-column align='center' prop="hotelRestaurantName" label="餐厅名称">
			</el-table-column>
			<el-table-column align='center' prop="carPicture" label="酒店图片">
				<template scope='scope'>
					<template v-for='src in scope.row.hotelPicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}"
						@click='showBigImg(src)'>
					</template>
				</template>	
			</el-table-column>
			<el-table-column align='center' prop="hotelRemark" label="备注/注意事项" show-overflow-tooltip width='300'>
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
				<el-form-item label="所在地区">
					<el-select v-model="addFormSendData.hotelAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item>
				<el-form-item label="酒店名称">
					<el-input v-model="addFormSendData.hotelName" placeholder="请输入酒店名称"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>				
				</el-form-item>
				<el-form-item label="房间数量">
					<el-input-number v-model="addFormSendData.hotelHomeNum" placeholder="请输入房间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="包房数量">
					<el-input-number  v-model="addFormSendData.hotelCharteredRoomNum" 
					placeholder="请输入包房数量"
					:min='0'></el-input-number >
				</el-form-item>
				<el-form-item label="餐厅名称">
					<el-input  v-model="addFormSendData.hotelRestaurantName" 
					placeholder="请输入餐厅名称"
					></el-input>
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="addFormSendData.hotelRemark"></el-input>
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
				<el-form-item label="所在地区">
					<el-select v-model="editFormSendData.hotelAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item>
				<el-form-item label="酒店名称">
					<el-input v-model="editFormSendData.hotelName" placeholder="请输入酒店名称"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>				
				</el-form-item>
				<el-form-item label="房间数量">
					<el-input-number v-model="editFormSendData.hotelHomeNum" placeholder="请输入房间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="包房数量">
					<el-input-number  v-model="editFormSendData.hotelCharteredRoomNum" 
					placeholder="请输入包房数量"
					:min='0'></el-input-number >
				</el-form-item>
				<el-form-item label="餐厅名称">
					<el-input  v-model="editFormSendData.hotelRestaurantName" 
					placeholder="请输入餐厅名称"
					></el-input>
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="editFormSendData.hotelRemark"></el-input>
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

				getAllDataUrl: '/api/hotel/getFormValue',
				getAllDataParams: {
					page: 1,
					limit: 10
				},
				imgWidth:'100px',
				imgHeight:'100px',
				reGetCount: 5,//获取失败重复获取数据次数
				upLoadUrl:'/api/admin/upload',
				existImgList:['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'],//存在的图片
				imgsArr:[],//上传的所有图片

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

				addFormUrl: '/api/hotel/addFormValue',
				addFormSendData:{
					hotelCharteredRoomNum:"",
					hotelHomeNum:"",
					hotelName:"",
					hotelPicture:"",
					hotelRemark:"",
					hotelRestaurantName:"",
					tourLevel:'',
					hotelPicture:'',
					hotelAreaId:'',
				},

				//上传图片部分
				dialogVisible: false,

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					hotelCharteredRoomNum:"",
					hotelHomeNum:"",
					hotelName:"",
					hotelPicture:"",
					hotelRemark:"",
					hotelRestaurantName:"",
					tourLevel:'',
					hotelPicture:'',
					hotelAreaId:'',
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:'/api/attraction/addFormValue',

				//删除
				delUrl:'/api/hotel/del/'

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
			getHotelArea(){

				this.$axios.get('/api/area/getAll').then((res)=>{
					if(res.data.ok){
						this.hotelArea = res.data.data
						console.log(res.data)
					}else{
						console.log('获取地区失败')
					}
				})
			},
			
			handleDel(index, row){
				var id = row.hotelId
				

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

				this.existImgList = row.hotelPicture

				this.editFormVisible = true
				
			},
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						console.log(this.imgsArr)
				this[_params]['hotelPicture'] = this.arrToStr(this.imgsArr) || this.arrToStr(this.existImgList)					

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
						hotelId:row_data.hotelId,
						hotelCharteredRoomNum:row_data.hotelCharteredRoomNum,
						hotelHomeNum:row_data.hotelHomeNum,
						hotelName:row_data.hotelName,
						hotelRemark:row_data.hotelRemark,
						hotelRestaurantName:row_data.hotelRestaurantName,
						tourLevel:row_data.tourLevel,
						hotelAreaId:row_data.hotelAreaId,
						hotelPicture: row_data.hotelPicture?row_data.hotelPicture.split(',') : [],
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
			this.getHotelArea()
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
		.add-hotel
			padding 8px 30px
			margin-left 30px	

	.hide
		display none

</style>
