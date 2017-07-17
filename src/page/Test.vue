<template>
    <div>
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
		
		<el-dialog
		  title="图片展示"
		  :visible.sync="dialogVisible"
		  size="small"
		  :show-close='false'
		  >

		  <el-carousel :interval="4000" type="card" height="200px">
		   <el-carousel-item v-for="item in pictures" :key="item">
		     <img class="carousel-img" :src="item">
		   </el-carousel-item>
		 </el-carousel>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关闭</el-button>
		    <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
		  </span>
		</el-dialog>    	
    </div>
</template>
<script>
  export default {
  	props:{
  		pictures:{
  			type: [String, Array],
  			default(){
  				return ["http://47.94.218.61/images/2017/07/16/2017071603202882305673.jpg",]
  			}
  		}
  	},
    data() {
      return {
        dialogVisible: false,
        // pictures:[
        // 	"http://47.94.218.61/images/2017/07/16/2017071603202882305673.jpg",
        // 	// "http://47.94.218.61/images/2017/07/16/2017071603202999701217.jpg",
        // 	// "http://47.94.218.61/images/2017/07/16/2017071603203238809157.jpg",
        // 	// "http://47.94.218.61/images/2017/07/16/2017071603203298901379.PNG",
        // 	// "http://47.94.218.61/images/2017/07/16/201707160320331520835.JPG",
        // ]
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then()
          .catch();
      }
    }
  };
</script>
<style scoped>
   .el-carousel__item{
   	padding:10px;
   }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel-img-wrap {
	width: 100%;
	height: 100%;
	padding: 15px;
  }
  .carousel-img {
  	width: 100%;
  	height: 100%;
  }
</style>