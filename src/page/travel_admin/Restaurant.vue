<template>
	<div>
		<div class="b-top">
			<div class="t-tit">餐厅</div>
			<el-button 
				class="add-res"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="carId" label="ID">
			</el-table-column>
			<el-table-column prop="carLuggageNum" label="carLuggageNum">
			</el-table-column>
			<el-table-column prop="carName" label="carName">
			</el-table-column>
			<el-table-column prop="carNo" label="carNo">
			</el-table-column>
			<el-table-column prop="carPicture" label="carPicture">
				<template scope="img_url">
					<img src="carPicture" title="carPicture">
				</template>
			</el-table-column>
			<el-table-column prop="carRemark" label="carRemark">
			</el-table-column>
			<el-table-column prop="carSeatNum" label="carSeatNum">
			</el-table-column>
			<el-table-column prop="carType" label="carType">
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
					<el-select v-model="addFormSendData.resAreaId" placeholder="请选择所在地区">
 					  <el-option
 					    v-for="(item,index) in hotelArea"
 					    :key="item.areaId"
 					    :label="item.areaName"
 					    :value="item.areaId">
 					  </el-option>
 	 				</el-select>
 	 			</el-form-item>
				<el-form-item label="餐厅名称">
					<el-input v-model="addFormSendData.resName" placeholder="请输入餐厅名称"></el-input>
				</el-form-item>
				<el-form-item label="餐厅图片">
					<el-upload
					  action="/api/admin/upload"
					  list-type="picture-card"
					  :on-success="handlePictureWorkSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="座位数量">
					<el-input-number v-model="addFormSendData.resSeatNum" placeholder="请输入座位数量"></el-input-number>
				</el-form-item>
				<el-form-item label="洗手间数量">
					<el-input-number  v-model="addFormSendData.resToiletName" 
					placeholder="请输入洗手间数量"
					:min='0'></el-input-number >
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="addFormSendData.resRemark"></el-input>
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
				<el-form-item label="游览车名称">
					<el-input v-model="editFormSendData.carName" placeholder="请输入游览车名称"></el-input>
				</el-form-item>
				<el-form-item label="游览车车牌">
					<el-input v-model="editFormSendData.carNo" placeholder="请输入游览车车牌"></el-input>
				</el-form-item>
				<el-form-item label="游览车车款">
					<el-input v-model="editFormSendData.carType" placeholder="请输入游览车车款"></el-input>
				</el-form-item>
				<el-form-item label="游览车图片">

				</el-form-item>
				<el-form-item label="游览车座位数">
					<el-input-number  v-model="editFormSendData.carSeatNum " 
					placeholder="请输入游览车座位数"
					:min='1' :max='7'></el-input-number >
				</el-form-item>
				<el-form-item label="游览车行李数">
					<el-input-number  v-model="editFormSendData.carLuggage" 
					placeholder="请输入游览车行李数"
					:min='1' :max='7'></el-input-number >
				</el-form-item>
				<el-form-item label="备注/注意事项">
					<el-input type="textarea" v-model="editFormSendData.carRemark"></el-input>
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
				getAllDataUrl: '/api/hotel/getHotelsByAreaIdr',
				getAllDataParams: {
					page: 1,
					limit: 10
				},
				listLoading:false,
				allData: [],
				tourLevelData:[
					{value: 1,label: '高端'},
					{value: 0,label: '普通'}
				],
				hotelArea: [
					
				],
				addLoading:false,

				//新增部分所用数据
				addFormVisible: false,

				addFormOriginData:{},
				addFormUrl: '/api/restaurant/addFormValue',
				addFormSendData:{
					resSeatNum:"",
					resToiletName:"",
					resName:"",
					resAreaId:'',
					resPicture:'',
					tourLevel:'',
				},
				//上传图片部分
				pictureArr: [],
				dialogVisible: false,
				dialogWorkImageUrl: '',

				//编辑部分所用数据
				editFormVisible: false,
				editFormCarUrl: '/api/hotel/addFormValue',
				editForm:{},
				editFormOriginData:{},
				editFormSendData:{},

			}
		},
		methods:{
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
			handleRemove(file,files){
				
			},
			handlePictureWorkSuccess(file){
				this.pictureArr.push(file.url)
				this.addFormSendData.resPicture = this.pictureArr.join(',')
			},
			handleDel(){
				console.log(222)
			},
			handleEdit(index, row){
				console.log(111)
				this.editFormVisible = true
				this.editFormSendData = Object.assign({},row)
			},
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'

				this.$refs[form].validate((valid)=>{
					if(valid){
						this.$axios.post(this[_url],this[_params]).then((res)=>{
							var result = res.data
							if(result.ok){
								this.$alert(result.msg, '提示', {
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
						carId: row_data.carId,
						carLuggageNum: row_data.carLuggageNum,
						carName: row_data.carName,
						carNo: row_data.carNo,
						carPicture: row_data.carPicture,
						carRemark: row_data.carRemark,
						carSeatNum: row_data.carSeatNum,
						carType: row_data.carType,
						status: row_data.status,
						tourLevel:parseInt(row_data.status)
					}
					_data.push(_row_data)
				}

				return _data
			}
		},
		mounted(){
			// this.getAllData()
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
		.add-res
			padding 8px 30px
			margin-left 30px	



</style>
