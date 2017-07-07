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
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="cruisesId" label="ID">
			</el-table-column>
			<el-table-column prop="cruisesName" label="游轮名称">
			</el-table-column>
			<el-table-column prop="cruisesIchnography" label="游轮设施">
			</el-table-column>
			<el-table-column prop="cruisesHomeNum" label="游轮总房间数">
			</el-table-column>
			<el-table-column prop="cruisesSimpleNum" label="游轮单人间数量">
			</el-table-column>
			<el-table-column prop="cruisesDoubleNum" label="游轮双人间数量">
			</el-table-column>
			<el-table-column prop="cruisesFacilities" label="游轮平面图">
				<template scope="scope">
					<img :src="scope.row.cruisesFacilities" :style="{width:imgWidth,height:imgHeight}">
				</template>
			</el-table-column>
			<el-table-column prop="cruisesPicture" label="游轮图片">
				<template scope="scope">
					<img :src="scope.row.cruisesPicture" :style="{width:imgWidth,height:imgHeight}">
				</template>
			</el-table-column>
			<el-table-column prop="cruisesLong" label="游轮长">
			</el-table-column>
			<el-table-column prop="cruisesWidth" label="游轮宽">
			</el-table-column>
			<el-table-column prop="cruisesHeight" label="游轮高">
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
				
				<el-form-item label="游轮名称">
					<el-input v-model="addFormSendData.cruisesName" placeholder="请输入游轮名称"></el-input>
				</el-form-item>
				<el-form-item label="游轮设施">
					<el-input v-model="addFormSendData.cruisesIchnography" placeholder="请输入游轮设施"></el-input>
				</el-form-item>
				<el-form-item label="游轮总房间数">
					<el-input-number v-model="addFormSendData.cruisesHomeNum" placeholder="请输入游轮总房间数"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮单人间数量">
					<el-input-number v-model="addFormSendData.cruisesSimpleNum" placeholder="请输入游轮单人间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮双人间数量">
					<el-input-number v-model="addFormSendData.cruisesDoubleNum" placeholder="请输入游轮双人间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮平面图">
					<el-upload
					  action="/api/admin/upload"
					  list-type="picture-card"
					  :on-success="handlePicturePlainSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="游轮图片">
					<el-upload
					  action="/api/admin/upload"
					  list-type="picture-card"
					  :on-success="handlePictureSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="游轮长">
					<el-input-number v-model="addFormSendData.cruisesLong" :controls="false" placeholder="请输入游轮长"></el-input-number>(单位:米)
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
				
				<el-form-item label="游轮名称">
					<el-input v-model="editFormSendData.cruisesName" placeholder="请输入游轮名称"></el-input>
				</el-form-item>
				<el-form-item label="游轮设施">
					<el-input v-model="editFormSendData.cruisesIchnography" placeholder="请输入游轮设施"></el-input>
				</el-form-item>
				<el-form-item label="游轮总房间数">
					<el-input-number v-model="editFormSendData.cruisesHomeNum" placeholder="请输入游轮总房间数"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮单人间数量">
					<el-input-number v-model="editFormSendData.cruisesSimpleNum" placeholder="请输入游轮单人间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮双人间数量">
					<el-input-number v-model="editFormSendData.cruisesDoubleNum" placeholder="请输入游轮双人间数量"></el-input-number>
				</el-form-item>
				<el-form-item label="游轮平面图">
					<el-upload
					  action="/api/admin/upload"
					  list-type="picture-card"
					  :on-success="handlePicturePlainSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<!-- <el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogWorkImageUrl" alt="" >
					</el-dialog> -->
				</el-form-item>
				<el-form-item label="游轮图片">


				 	<template ref='cruisesFacilities'>
				 		<img :src="editFormSendData.cruisesFacilities" alt=""  :style="{width:imgWidth,height:imgHeight}">
				 	</template>
					<el-upload
					  action="/api/admin/upload"
					  list-type="picture-card"
					  :on-success="handlePictureSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<!-- <el-dialog v-model="dialogVisible=true" size="tiny">
					  <img width="100%" :src="editFormSendData.cruisesFacilities" alt="">
					</el-dialog> -->
				</el-form-item>
				<el-form-item label="游轮长">
					<el-input-number v-model="editFormSendData.cruisesLong" :controls="false" placeholder="请输入游轮长"></el-input-number>(单位:米)
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
				<el-button type="primary" @click.native="submitForm('editForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				delSigleData:'/api/car/del/{carId}',
				getAllDataUrl: '/api/cruises/findAllCruises',
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
				imgWidth:'100px',
				imgHeight:'100px',

				//新增部分所用数据
				addFormVisible: false,

				addFormOriginData:{},
				addFormUrl: '/api/cruises/addFormValue',
				addFormSendData:{
					cruisesName:"",
					cruisesDoubleNum:"",
					cruisesFacilities:"",
					cruisesHeight:"",
					cruisesHomeNum:'',
					cruisesIchnography:'',
					cruisesLong:'',
					cruisesPicture:'',
					cruisesSimpleNum:'',
					cruisesWidth:'',
					tourLevel:'',
				},
				//上传图片部分
				picturePlainArr: [],
				pictureArr: [],
				dialogVisible: false,
				dialogWorkImageUrl: '',

				//编辑部分所用数据
				editFormVisible: false,
				editFormUrl: '/api/cruises/addFormValue',
				editForm:{},
				editFormOriginData:{},
				editFormSendData:{
					cruisesName:"",
					cruisesDoubleNum:"",
					cruisesFacilities:"",
					cruisesHeight:"",
					cruisesHomeNum:'',
					cruisesIchnography:'',
					cruisesLong:'',
					cruisesPicture:'',
					cruisesSimpleNum:'',
					cruisesWidth:'',
					tourLevel:'0',
				},

			}
		},
		methods:{
		
			handleRemove(file,files){
				
			},
			handlePictureSuccess(file,name){
				console.log(this.$refs.cruisesFacilities)
				if(this.$refs.cruisesFacilities){this.$refs.cruisesFacilitie.hide()}
				this.pictureArr.push(file.url)
				this.addFormSendData.cruisesPicture = this.pictureArr.join(',')
			},
			handlePicturePlainSuccess(file,name){
				this.pictureArr.push(file.url)
				this.addFormSendData.cruisesFacilities = this.pictureArr.join(',')
			},
			handleDel(){
				
				// this.$axios.get('')
			},
			handleEdit(index, row){
				this.editFormVisible = true
				console.log(row)
				this.editFormSendData = Object.assign({},row)

				if(!this.editFormSendData.tourLevel){
					this.editFormSendData=Object.assign(this.editFormSendData,{tourLevel:0})
				}
				
				console.log(row)
			},
			submitForm(form){
				var _self = this
				var _url = form+'Url',
						_params = form+'SendData'

				this.$refs[form].validate((valid)=>{
					if(valid){
						_self.$axios.post(this[_url],this[_params]).then((res)=>{
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
					}else{

					}
				})
			},
			getAllData(){
				this.listLoading = true
				this.$axios.get(this.getAllDataUrl,this.getAllDataParams).then((res)=>{
					this.listLoading = false
					var result = res.data
					this.allData = result.data
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
