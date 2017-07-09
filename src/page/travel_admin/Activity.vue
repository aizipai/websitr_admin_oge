<template>
	<div>
		<div class="b-top">
			<div class="t-tit">资费活动</div>
			<el-button 
				class="add-active"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="optId" label="ID">
			</el-table-column>
			<el-table-column prop="optAreaId" label="所在地区">
			</el-table-column>
			<el-table-column prop="optName" label="活动名称">
			</el-table-column>
			<el-table-column prop="optStartTime" label="活动开始时间">
			</el-table-column>
			<el-table-column prop="optEndTime" label="活动结束时间">
			</el-table-column>
			<el-table-column prop="optPrice" label="价格">
			</el-table-column>
			<el-table-column prop="optPicture" label="酒店图片">
				<template scope='scope'>
					<template v-for='src in scope.row.optPicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}">
					</template>
				</template>	
			</el-table-column>
			<el-table-column prop="optRemark" label="备注">
			</el-table-column>
			<el-table-column prop="optAttention" label="注意事项">
			</el-table-column>
			<el-table-column label="操作" width="150">
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
				
			</el-form>
			
		</el-dialog>

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
					<el-select v-model="addFormSendData.optAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item>
				<el-form-item label="活动名称">
					<el-input v-model="addFormSendData.optName" placeholder="请输入活动名称"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-row>
						<el-col :span="11">
							<el-date-picker
    						  v-model="addFormSendData.optStartTime"
    						  type="datetime"
    						  placeholder="选择日期时间">
   							 </el-date-picker>
						</el-col>
						<el-col :span="2">——</el-col>
						<el-col :span="11">
							<el-date-picker
    						  v-model="addFormSendData.optEndTime"
    						  type="datetime"
    						  placeholder="选择日期时间">
   							 </el-date-picker>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="价格">
					<el-input-number v-model="addFormSendData.optPrice" placeholder="请输入价格"></el-input-number>
				</el-form-item>
				<el-form-item label="活动图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addFormSendData.optRemark"></el-input>
				</el-form-item>
				<el-form-item label="注意事项">
					<el-input type="textarea" v-model="addFormSendData.optAttention"></el-input>
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
					<el-select v-model="editFormSendData.optAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item>
				<el-form-item label="活动名称">
					<el-input v-model="editFormSendData.optName" placeholder="请输入活动名称"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-row>
						<el-col :span="11">
							<el-date-picker
    						  v-model="editFormSendData.optStartTime"
    						  type="datetime"
    						  placeholder="选择日期时间">
   							 </el-date-picker>
						</el-col>
						<el-col :span="2">——</el-col>
						<el-col :span="11">
							<el-date-picker
    						  v-model="editFormSendData.optEndTime"
    						  type="datetime"
    						  placeholder="选择日期时间">
   							 </el-date-picker>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="价格">
					<el-input-number v-model="editFormSendData.optPrice" placeholder="请输入价格"></el-input-number>
				</el-form-item>
				<el-form-item label="活动图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editFormSendData.optRemark"></el-input>
				</el-form-item>
				<el-form-item label="注意事项">
					<el-input type="textarea" v-model="editFormSendData.optAttention"></el-input>
				</el-form-item>
				</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('editForm')" :loading="editLoading">提交</el-button>
			</div>
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
				getAllDataUrl: '/api/optionalActivities/findAllOptionalActivities',
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

				addFormUrl: '/api/optionalActivities/addFormValue',
				addFormSendData:{
					optAreaId:"",
					optAttention:"",
					optEndTime:"",
					optName:"",
					optPicture:"",
					optPrice:"",
					optRemark:'',
					optStartTime:'',
					tourLevel:'',
					optId:''
				},

				//上传图片部分
				pictureArr: [],
				dialogVisible: false,

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					optAreaId:"",
					optAttention:"",
					optEndTime:"",
					optName:"",
					optPicture:"",
					optPrice:"",
					optRemark:'',
					optStartTime:'',
					tourLevel:'',
					optId:'',
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:'/api/optionalActivities/addFormValue',

				//删除
				delUrl:'/api/optionalActivities/del/'

			}
		},
		methods:{
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
				var id = row.optId
				

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

				this.existImgList = row.optPicture

				this.editFormVisible = true
				
			},
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						
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
						optAreaId:row_data.optAreaId,
						optAttention:row_data.optAttention,
						optEndTime:row_data.optEndTime,
						optName:row_data.optName,
						optPrice:row_data.optPrice,
						optRemark:row_data.optRemark,
						optStartTime:row_data.optStartTime,
						tourLevel:row_data.tourLevel,
						optId:row_data.optId,
						optPicture: row_data.optPicture?row_data.optPicture.split(',') : [],
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
		.add-active
			padding 8px 30px
			margin-left 30px	



</style>
