<template>
	<div class="b-sidebar">
  	<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>

  		<template v-for="item in menuData">
  			<template 
  			v-if="item.children">
  				<el-submenu :index='item.path'>
  					<template slot="title"><i class="fa fa-weixin"></i>{{item.name}}</template>
  					<template v-for="childItem in item.children">
  						<el-menu-item :index="childItem.path">{{childItem.name}}</el-menu-item>
  					</template>
      		</el-submenu>
  			</template>
  			<template 
  			v-else>
  				<el-menu-item 
  				:index="item.path"><i class="el-icon-menu"></i>{{item.name}}</el-menu-item>
  			</template>
  		</template>
    </el-menu>
	</div>
</template>
<script>
	
	export default {
		props:[],
		data(){
			return{
				menuData: [
					{name: '导航一',path: '/useradmin'},
					{
						name: '导航二',
						path: '/jingdian',
						children:[
							{name:'景点',path:'/jingdian'},
							{name:'酒店',path:'/hotel'},
							{name:'餐厅',path:'/restaurant'},
							{name:'游览车',path:'/bus'},
							{name:'游轮',path:'/cruises'},
							{name:'导游',path:'/tourist'},
							{name:'助理',path:'/assistant'},
							{name:'资费活动',path:'/activity'},
						]
					},
					{name: '导航三',path: '/rightadmin'},
					{name: '导航四',path: '/commonpro'}
				]
			}
		},
		methods: {
			handleOpen(){

			},
			handleClose(){

			}

		},
		created(){
			
		}
	}
	
</script>
<style lang='stylus' scoped>
	.b-sidebar
		
		color #fff
		width 100%
		background-color #0278F3
		min-height 400px
		height 100%
		// .el-menu-item
		//  .el-submenu__title
		//  	color #fff
</style>