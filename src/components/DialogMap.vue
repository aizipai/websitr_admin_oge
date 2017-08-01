<template>
    <div>
		<!-- <el-input type="text" @focus="dialogVisible = true" readonly>查看权限详情</el-input> -->
		
		<el-dialog
		  title="地图"
		  :visible.sync="visibleMap"
		  size="big"
		  :show-close='false'
      :close-on-click-modal="false"
      :modal = 'false'
      custom-class='dialog-class'
      style=' '
		  >
      <el-form :inline="true" >
        <el-form-item label="地区：">
          <el-input v-model="location" ></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="keyword"></el-input>
        </el-form-item>
        
       <baidu-map
        :zoom='zoom'
        :center="center"
        @ready="handler"
        style='position:relative'>
          <bm-control>
          <button @click="zoom++">放大</button>
          <button @click="zoom=10">还原</button>
          <button @click="zoom--">缩小</button>
          </bm-control>
          <bm-view class="map"></bm-view>
          <bm-local-search :keyword="keyword"
           :auto-viewport="true" 
           :location="location" 
           @markersset='markersset'
           :panel='false'
           ></bm-local-search>
        </baidu-map>

		 <el-form-item label="地址：">
          <el-input :value="position.address" readonly="" placeholder='只读属性'></el-input>
        </el-form-item>
       </el-form>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="handleClose">关闭</el-button>
		    <el-button type="primary" @click="handleConfirm">确 定</el-button>
		  </span>
		</el-dialog>    	
    </div>
</template>
<script>
  import {BaiduMap} from 'vue-baidu-map'
  export default {

  	props:{
  		tableData:{
  			type: [String, Array, Object],
  		},
      visibleMap:{
        default: false
      }
  	},
    data() {
      return {
        dialogVisible: false,
        location: '',
        keyword: '',
        
        zoom:10,
        position:{
          lng: '',
          lat: '',
          address:'',
        },
        center: {lng: 0, lat: 0}
        };
    },
    methods: {
      handleClose(){
        this.$emit('onClose')
      },
      handleConfirm(){
        this.$emit('onConfrim', this.position)
      },
     handler ({BMap, map}) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      },
      handleZoom(flag){
        this.zoom = 19
      },
       markersset(e){
        var self = this;
        var point = document.querySelectorAll('.BMap_Marker.BMap_noprint')
        for(let i=0; i<point.length; i++){
          point[i].onclick = ()=>{
            self.position.lng=e[i].point.lng;
            self.position.lat=e[i].point.lat;
            self.position.address=e[i].address;
          }
        }
      },
    },
    computed:{
      
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
  .map-wrap{
  margin:0 auto;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.bm-view,.map {
  width: 300px;
  height: 300px;
}
</style>