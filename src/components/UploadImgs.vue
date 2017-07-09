<template>
	<el-upload
		  class="upload-demo"
		  ref="uploadImgs"
		  :action="upLoadUrl"
		  :on-success="handleUploadSucc"
		  :on-remove="handleRemove"
		  :file-list="existImgListShow"
		  :auto-upload="false"
		  list-type="picture-card">
		  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
		</el-upload>		
	</template>
<script>
	
	export default {
		props:['existImgList',],
		data(){
			return{
				upLoadUrl:'/api/admin/upload',
				imgsList:[],
			}
		},
		methods: {
			handleUploadSucc(response,file,fileList){
				this.imgsList.push(response['url'])
				this.$emit('uploadedImgs',this.imgsListToOut)
			},
			handleRemove(file,fileList){

				const target_url = file.response ? file.response['url'] : file['url']

			
				const arr = this.imgsListToOut.filter((sig_img_url)=>{
					
					console.log(sig_img_url!= target_url)
					return sig_img_url!= target_url
				})
				
				this.$emit('uploadedImgs',arr)
				
			},
			submitUpload(){
				this.$refs['uploadImgs'].submit()
			}

		},
		computed:{
			//上传后传出去的图片列表
			imgsListToOut(){
				return this.imgsList.concat(this.existImgList)
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
		}
	}
	
</script>
<style lang='stylus' scoped>
	
</style>