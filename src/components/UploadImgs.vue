<template>
	<div>
		<el-upload
		  multiple
		  class="upload-demo"
		  ref="uploadImgs"
		  :action="upLoadUrl"
		  :on-success="handleUploadSucc"
		  :on-preview="showBigImg"
		  :on-remove="handleRemove"
		  :file-list="existImgListShow"
		  :auto-upload="false"
		  list-type="picture-card">
		  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
		  <span class="attention-text">(注意：最多上传9张图片)</span>
		</el-upload>	
		<el-dialog v-model="dialogVisible" size="large" custom-class='img-dialog' :modal='showModal'>
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>	
	</div>
	
</template>
<script>
	
	export default {
		props:['existImgList',],
		data(){
			return{
				showModal: false,
				dialogImageUrl: '',
        		dialogVisible: false,
				upLoadUrl:API_URL['UPLOAD_IMG'],
				imgsList:[],
			}
		},
		methods: {
			showBigImg(file){
				this.dialogImageUrl = file.url;
       			this.dialogVisible = true;
			},
			handleUploadSucc(response,file,fileList){
				if(this.imgsList.length<9){
					this.imgsList.push(response['url'])
				}else {
					alert('最多上传9张图片')
					return
				}
				console.log(this.imgsList)
				this.$emit('uploadedImgs',this.imgsList)
			},
			handleRemove(file,fileList){

				const target_url = file.response ? file.response['url'] : file['url']

			
				this.imgsList = this.imgsList.filter((sig_img_url)=>{
					
					return sig_img_url!= target_url
				})
				console.log(this.imgsList)
				this.$emit('uploadedImgs',this.imgsList)
				
			},
			submitUpload(){
				this.$refs['uploadImgs'].submit()
			}

		},
		computed:{
			//上传后传出去的图片列表
			imgsListToOut(){
				return this.imgsList
			},
			// 处理传进来的arr为组件可用的arr
			existImgListShow(){
				const existImgListShow=[]
				this.existImgList.forEach((item)=>{
					const tem_obj = {}
					tem_obj.url = item
					existImgListShow.push(tem_obj)
				})
				return existImgListShow
			}
		},
		mounted(){
			this.imgsList = this.imgsList.concat(this.existImgList)
		}
	}
	
</script>
<style lang='stylus' scoped>
	.img-dialog
		z-index 99999
	.attention-text
		color red
</style>