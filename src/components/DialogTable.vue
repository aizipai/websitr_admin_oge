<template>
    <div>
		<el-button type="text" @click="dialogVisible = true">查看权限详情</el-button>
		
		<el-dialog
		  title="授权"
		  :visible.sync="dialogVisible"
		  size="small"
		  :show-close='false'
		  >

       <el-table :data="tableDataTran" max-height="300">
        <el-table-column property="companyId" label="授权公司" ></el-table-column>
        <el-table-column property="departmentId" label="授权部门" ></el-table-column>
        <el-table-column property="islooked" label="是否可见"></el-table-column>
        <el-table-column property="isupdate" label="是否可改"></el-table-column>
      </el-table>

		 

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
  		tableData:{
  			type: [String, Array, Object],
  			
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
    },
    computed:{
      tableDataTran(){
        this.tableData.forEach(sig_data =>{
          if(sig_data['islooked']==1){
              sig_data['islooked'] = '是'
          }
          if(sig_data['islooked']==0){
              sig_data['islooked'] = '否'
          }
          if(sig_data['isupdate']==1){
              sig_data['isupdate'] = '是'
          }
          if(sig_data['isupdate']==0){
              sig_data['isupdate'] = '否'
          }
        })
        return this.tableData

      }
    },
    mounted(){
     
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