<template>
	<div>
		<div class="b-top">
			<div class="t-tit">景点</div>
			<el-button 
				class="add-attraction"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>

		<!--列表-->
		<el-table :data='allData' highlight-current-row v-loading="listLoading"  style="width: 100%;"  max-height="500" >
			<el-table-column align='center' prop="attractionId" label="ID" width='100' >
			</el-table-column>
			<el-table-column align='center' prop="attractionName" label="景点名称" width='150' >
			</el-table-column>
			<el-table-column  align='center' prop="tourLevel" label="旅游团级别">
				<template scope = 'scope'>
					<span>{{scope.row.tourLevel|handleLevel}}</span>
				</template>
			</el-table-column>
			<el-table-column align='center' prop="attractionPicture" label="景点图片">
				<template scope='scope'> 
					<DialogCarousel :pictures='scope.row.attractionPicture'></DialogCarousel>
				</template>	
			</el-table-column>
			<el-table-column align='center' prop="attractionDescribe" label="景点描述" show-overflow-tooltip width='200'>
			</el-table-column>
			
			<el-table-column align='center' label="操作" width="150" fixed="right">
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
			<el-form :model="addFormSendData" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="景点名称" prop="attractionName">
					<el-input v-model="addFormSendData.attractionName"></el-input>
				</el-form-item>
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
				
				<el-form-item label="景点描述">
					<el-input type="textarea" v-model="addFormSendData.attractionDescribe"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
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
			<el-form :model="editFormSendData" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="景点名称" prop="attractionName">
					<el-input v-model="editFormSendData.attractionName"></el-input>
				</el-form-item>
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
				
				<el-form-item label="景点描述">
					<el-input type="textarea" v-model="editFormSendData.attractionDescribe"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
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

				getAllDataUrl: API_URL['GET_ATTR_LIST'], //获取数据url
				getAllDataParams: {page: 1,limit: 10},//获取数据参数
				imgWidth:'100px',
				imgHeight:'100px',
				reGetCount: 5,//获取失败重复获取数据次数

				upLoadUrl:API_URL['UPLOAD_IMG'],
				existImgList:[],//存在的图片
				imgsArr:[],//上传的所有图片


				allData:[],
				tourLevelData:[
					{value: 2,label: '全部'},
					{value: 1,label: '高端'},
					{value: 0,label: '标准'}
				],

				//列表
				listLoading:false,

				
				//添加数据
				addFormVisible:false,
				addFormSendData: {
					attractionName:null,
					attractionPicture:null,
					tourLevel:null,
					attractionDescribe:null,
				},
				addFormRules: {},
				addLoading:false,
				addFormUrl:API_URL['ADD_ATTR'],

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					attractionId:null,
					attractionName:null,
					attractionPicture:null,
					tourLevel:null,
					attractionDescribe:null,
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:API_URL['ADD_ATTR'],

				//删除
				delUrl:API_URL['DEL_ATTR'],
				
			}
		},
		methods:{
			showBigImg(src){
				this.dialogImageUrl = src,
				this.imgDialogVisible = true
			},
			//处理上传的图片
			handleUploadedImgs(uploadedImgs){
				this.imgsArr = uploadedImgs
			},
			
			//处理编辑
			handleEdit(index, row){

				this.editFormSendData = Object.assign({},row)

				this.editFormSendData.tourLevel = parseInt(this.editFormSendData.tourLevel)

				this.existImgList = row.attractionPicture

				this.editFormVisible = true
			},
			handleDel(index, row){
				var id = row.attractionId
				

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
			//提交
			submitForm(form){

				var _url = form+'Url',
						_params = form+'SendData'
						
				this[_params]['attractionPicture'] = this.arrToStr(this.imgsArr) || this.arrToStr(this.existImgList)						

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
					if(result.ok){
						this.allData = this.handleData(result.data)
					}else {
						if(count>this.reGetCount){
							alert('获取数据失败'+result.msg)
						}else {
							this.getAllData()
						}
					}
				})
			},
			handleData(datas){
				datas = Object.prototype.toString.call(datas) == '[object Array]'? datas : [datas]

				const _data = []
				for(let i=0; i< datas.length; i++){
					const row_data = datas[i]
					const _row_data = {
						attractionId: row_data.attractionId,
						attractionName: row_data.attractionName,
						tourLevel: row_data.tourLevel,
						attractionDescribe:row_data.attractionDescribe,
						attractionPicture: row_data.attractionPicture?row_data.attractionPicture.split(',') : [],

	
					}
					_data.push(_row_data)
				}

				return _data
			},
			arrToStr(arr,fenge=','){
				return arr.join(fenge)
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
		.add-attraction
			padding 8px 30px
			margin-left 30px	

	img 
		width 100px
		height 100px

</style>
