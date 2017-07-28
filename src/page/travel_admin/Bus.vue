<template>
	<div>
		<div class="b-top">
			<div class="t-tit">游览车</div>
			<el-button 
				class="add-car"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;" max-height="500">
			<el-table-column align='center' prop="carId" label="游览车ID">
			</el-table-column>
			<el-table-column  align='center' prop="tourLevel" label="旅游团级别">
				<template scope = 'scope'>
					<span>{{scope.row.tourLevel|handleLevel}}</span>
				</template>
			</el-table-column>
			<el-table-column align='center' prop="carName" label="游览车名称">
			</el-table-column>
			<el-table-column align='center' prop="carNo" label="游览车车牌">
			</el-table-column>
			<el-table-column align='center' prop="carType" label="游览车车款">
			</el-table-column>
			<el-table-column align='center' prop="carPicture" label="游览车图片">
				<template scope='scope'> 
					<DialogCarousel :pictures='scope.row.carPicture'></DialogCarousel>
				</template>	
			</el-table-column>
			<el-table-column align='center' prop="carSeatNum" label="游览车座位数">
			</el-table-column>
			<el-table-column align='center' prop="carLuggageNum" label="游览车行李数">
			</el-table-column>
			<el-table-column align='center' prop="carRemark" label="备注/注意事项" show-overflow-tooltip width='300'>
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
				<el-form-item label="游览车名称">
					<el-input v-model="addFormSendData.carName" placeholder="请输入游览车名称"></el-input>
				</el-form-item>
				<el-form-item label="游览车车牌">
					<el-input v-model="addFormSendData.carNo" placeholder="请输入游览车车牌"></el-input>
				</el-form-item>
				<el-form-item label="游览车车款">
					<el-input v-model="addFormSendData.carType" placeholder="请输入游览车车款"></el-input>
				</el-form-item>
				
				<el-form-item label="游览车座位数">
					<el-input-number  v-model="addFormSendData.carSeatNum " 
					placeholder="请输入游览车座位数"
					:min='1'></el-input-number >
				</el-form-item>
				<el-form-item label="游览车行李数">
					<el-input-number  v-model="addFormSendData.carLuggageNum" 
					placeholder="请输入游览车行李数"
					:min='1' ></el-input-number >
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="addFormSendData.carRemark"></el-input>
				</el-form-item>
				<el-form-item label="游览车图片">
					<upload-imgs 
					:existImgList='[]'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
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
				<el-form-item label="游览车名称">
					<el-input v-model="editFormSendData.carName" placeholder="请输入游览车名称"></el-input>
				</el-form-item>
				<el-form-item label="游览车车牌">
					<el-input v-model="editFormSendData.carNo" placeholder="请输入游览车车牌"></el-input>
				</el-form-item>
				<el-form-item label="游览车车款">
					<el-input v-model="editFormSendData.carType" placeholder="请输入游览车车款"></el-input>
				</el-form-item>
				
				<el-form-item label="游览车座位数">
					<el-input-number  v-model="editFormSendData.carSeatNum " 
					placeholder="请输入游览车座位数"
					:min='1'></el-input-number >
				</el-form-item>
				<el-form-item label="游览车行李数">
					<el-input-number  v-model="editFormSendData.carLuggageNum" 
					placeholder="请输入游览车行李数"
					:min='1' ></el-input-number >
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="editFormSendData.carRemark"></el-input>
				</el-form-item>
				<el-form-item label="游览车图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
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

				getAllDataUrl: API_URL['GET_CAR_LIST'],
				getAllDataParams: {
					page: 1,
					limit: 10
				},
				imgWidth:'100px',
				imgHeight:'100px',
				reGetCount: 5,//获取失败重复获取数据次数
				upLoadUrl:API_URL['UPLOAD_IMG'],
				existImgList:[],//存在的图片
				imgsArr:[],//上传的所有图片

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

				addFormUrl: API_URL['ADD_CAR'],
				addFormSendData:{
					carId:'',
					carName:'',
					carPicture:'',
					carNo:'',
					carType:'',
					carSeatNum:'',
					carLuggageNum:'',
					carRemark:'',	
					tourLevel:''				
				},

				//上传图片部分
				pictureArr: [],
				dialogVisible: false,

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					carId:'',
					carName:'',
					carPicture:'',
					carNo:'',
					carType:'',
					carSeatNum:'',
					carLuggageNum:'',
					carRemark:'',
					tourLevel:''
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:API_URL['ADD_CAR'],

				//删除
				delUrl:API_URL['DEL_CAR'],

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
			
			handleDel(index, row){
				var id = row.carId	
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

				this.existImgList = row.carPicture

				this.editFormVisible = true
				
			},
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						
				this[_params]['carPicture'] = this.arrToStr(this.imgsArr) || this.arrToStr(this.existImgList)					

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
						carId:row_data.carId,
						carName:row_data.carName,
						carPicture:row_data.carPicture,
						carNo:row_data.carNo,
						carType:row_data.carType,
						carSeatNum:row_data.carSeatNum,
						carLuggageNum:row_data.carLuggageNum,
						carRemark:row_data.carRemark,
						tourLevel:row_data.tourLevel,
						carPicture: row_data.carPicture?row_data.carPicture.split(',') : [],
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
		.add-car
			padding 8px 30px
			margin-left 30px	



</style>
