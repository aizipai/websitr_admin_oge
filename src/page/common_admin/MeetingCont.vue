<template>
	<div>
		<div class="b-top">
			<div class="t-tit">{{$route.name}}</div>
			<el-button 
				class="add-car"
  				type="primary" 
  				size="small" 
  				@click="addFormVisible = true">添加</el-button>
		</div>
		
		<!-- 列表部分 -->
		<el-table :data="allData" highlight-current-row v-loading="listLoading"  style="width: 100%;" max-height="500">
			<el-table-column align='center' prop="carId" label="ID">
			</el-table-column>
			
			<el-table-column align='center' prop="carName" label="授权公司">
			</el-table-column>
			<el-table-column align='center' prop="carNo" label="授权部门">
			</el-table-column>
			<el-table-column align='center' prop="carPicture" :label="$route.name+'图片'">
				<template scope='scope'> 
					<DialogCarousel :pictures='scope.row.carPicture'></DialogCarousel>
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
				
				<el-form-item label="授权公司">
					<el-select v-model="sigPermission.companyId" @change='doGetDepartmentData(sigPermission.companyId)' placeholder="请选择公司名称">
          		      <el-option
          		        v-for="item in companyData"
          		        :key="item.companyId"
          		        :label="item.companyName"
          		        :value="item.companyId"
          		        >
          		      </el-option>
          		    </el-select>
				</el-form-item>

				<el-form-item label="授权部门">
					<el-select v-model="sigPermission.departmentId" placeholder="请选择公司名称">
          		      <el-option
          		        v-for="item in departData"
          		        :key="item.departmentId"
          		        :label="item.departmentName"
          		        :value="item.id"
          		        >
          		      </el-option>
          		    </el-select>

          		    <!-- <el-checkbox-group v-model="sigPermission.departmentId">
    					<el-checkbox v-for="item in departData" :label="item.id" :key="item.departmentId">{{item.departmentName}}</el-checkbox>
  					</el-checkbox-group> -->
				</el-form-item>

				<el-form-item label="是否可见">
					<el-radio class="radio" v-model="sigPermission.islooked" label="1">是</el-radio>
  					<el-radio class="radio" v-model="sigPermission.islooked" label="0">否</el-radio>
				</el-form-item>

				<el-form-item label="是否可修改">
					<el-radio class="radio" v-model="sigPermission.isupdate" label="1">是</el-radio>
  					<el-radio class="radio" v-model="sigPermission.isupdate" label="0">否</el-radio>
				</el-form-item>

				
				<el-form-item label="">
					<el-button type="primary" @click='pushItemData' style='width:300px;margin-left:-100px'>添加</el-button>
				</el-form-item>
				
				<el-form-item :label="$route.name+'名称'">
					<el-input v-model="addFormSendData" :placeholder="$route.name+'名称'"></el-input>
				</el-form-item>
				<el-form-item :label="$route.name+'图片'">
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
				companyData:null,
				departData:null,
				// departData:[],
				getCompanyUrl: API_URL['GET_COMPANY'], 
       			 getDepartmentUrl: API_URL['GET_DEPTMENT'], 
				dialogImageUrl:'',
				imgDialogVisible: false,

				getAllDataUrl: API_URL['GET_LIST'],
				getAllDataParams: {
					parentId:0
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

				addFormUrl: API_URL['ADD_COMMON'],
				addFormSendData:{
					noticeBoard:{
						parentId: 0,
						notiMeeting:null,
						notiJourney:null
					},
					permission: []
				},
				sigPermission:{
					"companyId": null,
            		"departmentId": null,
            		"islooked": null,
            		"isupdate":null
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
			
			pushItemData(){
				const _sigPermission = {}
				for(let key in this.sigPermission){
					_sigPermission[key] = this.sigPermission[key]
				}
				this.addFormSendData.permission.push(_sigPermission)
				this.$alert('添加成功，可继续添加授权公司和部门', '提示', {
        		  confirmButtonText: '确定',
        		  callback: action => {
        		    for(let key in this.sigPermission){
        		    	// if(key != '')
        		    	 this.sigPermission[key]= null
        		    }
        		  }
        		});
			},
			doGetDepartmentData(c_id,resolve){
				if(c_id === null){return}
     		  this.$axios.get(this.getDepartmentUrl+c_id).then((res)=>{
     		    const result = res.data
     		    if(result.ok){
     		    	this.departData = result.data
     		    }else{
     		      alert(result.msg)
     		    }
     		  })
     		},
			doGetCompanyData(){

    		   this.$axios.get(this.getCompanyUrl).then((res)=>{
    		     const result = res.data
    		     if(result.ok){
    		       this.companyData = result.data
    		     }else{
    		       alert('获取公司列表失败')
    		     }
    		   })
    		 },
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
						
				this[_params]['noticeBoard']['notiMeeting'] = this.arrToStr(this.imgsArr) || this.arrToStr(this.existImgList)					
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
				this.$axios.post(this.getAllDataUrl,this.getAllDataParams).then((res)=>{
					this.listLoading = false
					var result = res.data
					// this.allData = this.handleData(result.data)
					console.log(result)
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
			// this.getAllData()
			this.doGetCompanyData()
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
