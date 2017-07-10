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
		<el-table :data='allData' highlight-current-row v-loading="listLoading"  style="width: 100%;"  max-height="800">
			<el-table-column align='center' prop="attractionId" label="ID" width='100' >
			</el-table-column>
			<el-table-column align='center' prop="attractionName" label="景点名称" width='150' >
			</el-table-column>
			<el-table-column align='center' prop="attractionPicture" label="景点图片">
				<template scope='scope'> 
					<template v-for='src in scope.row.attractionPicture'>
						<img :src='src' :style="{width:imgWidth,height:imgHeight}" @click='showBigImg(src)'>
					</template>
					
				</template>	
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
			<el-form :model="addFormSendData" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="活动名称" prop="attractionName">
					<el-input v-model="addFormSendData.attractionName"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<upload-imgs 
					:existImgList='existImgList'
					@uploadedImgs='handleUploadedImgs'></upload-imgs>				
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitForm('addForm')" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" 
		:visible.sync="editFormVisible"
		ref="editFormDialog">
			<el-form :model="editFormSendData" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="活动名称" prop="attractionName">
					<el-input v-model="editFormSendData.attractionName"></el-input>
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
	export default{
		components:{
			UploadImgs
		},
		data(){
			return{
				dialogImageUrl:'',
				imgDialogVisible: false,

				getAllDataUrl: '/api/attraction/findAllAttraction', //获取数据url
				getAllDataParams: {page: 1,limit: 10},//获取数据参数
				reGetCount: 5,//获取失败重复获取数据次数

				upLoadUrl:'/api/admin/upload',
				existImgList:['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'],//存在的图片
				imgsArr:[],//上传的所有图片

				allData:[],

				//列表
				listLoading:false,

				
				//添加数据
				addFormVisible:false,
				addFormSendData: {
					attractionName:'',
					attractionPicture:''
				},
				addFormRules: {},
				addLoading:false,
				addFormUrl:'/api/attraction/addFormValue',

				//编辑数据
				editFormVisible:false,
				editFormSendData: {
					attractionId:'',
					attractionName:'',
					attractionPicture:'',
				},
				editFormRules: {},
				editLoading:false,
				editFormUrl:'/api/attraction/addFormValue',

				//删除
				delUrl:'/api/attraction/del/',
				
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
					console.log(result)
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
