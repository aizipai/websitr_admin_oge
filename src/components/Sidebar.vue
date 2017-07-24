<template>
	<div class="b-sidebar">
  	<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>

  		<template v-for="item in menuData">
  			<template 
  			v-if="item.children">
  				<el-submenu :index='item.path'>
  					<template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
  					<template v-for="childItem in item.children">
						
						<template 
  						v-if="childItem.children">
  							<el-submenu :index='childItem.path'>
  								<template slot="title"><i class="el-icon-menu"></i>{{childItem.name}}</template>
  								<template v-for="subChildItem in childItem.children">
			
			
  									<el-menu-item :index="subChildItem.path">{{subChildItem.name}}</el-menu-item>
			
  								</template>
      						</el-submenu>
  						</template>
  						<template 
  						v-else>
  							<el-menu-item 
  							:index="childItem.path"><i class="el-icon-menu"></i>{{childItem.name}}</el-menu-item>
  						</template>

  						

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
					{name: '用户管理',path: '/useradmin'},
					{
						name: '行程管理', 
						path: '/jingdian',
						children:[
							{name:'景点',path:'/jingdian'},
							{name:'酒店',path:'/hotel'},
							{name:'餐厅',path:'/restaurant'},
							// {name:'菜单',path:'/menu'},
							{name:'游览车',path:'/bus'},
							{name:'游轮',path:'/cruises'},
							{name:'导游',path:'/tourist'},
							{name:'自费活动',path:'/activity'},
						]
					},
					{
						name: '公共栏目',
						path: '/commonpro',
						children:[
							{name:'基本信息',path:'/commonpro/BaseInfo',
							  children:[
							  	{name:'行程',path:'/Trip'},
							  	{name:'自费表格',path:'/SelfTable'},
							  	{name:'出团计划',path:'/TPlan'},
							  	{name:'差价表',path:'/ChaJiaTable'},
							  	{name:'热气球须知',path:'/HotBall'},
							  	{name:'埃及行程须知',path:'/EgyptTrip'},
							  	{name:'导游评价模板',path:'/TC'},
							  	{name:'分房表模板',path:'/FenFang'},
							  ]
							},
							{name:'开会内容',path:'/MeetingCont'},
							{name:'临时公告',path:'/TempNotice'},
						]
					}
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
		height 100%
		// .el-menu-item
		//  .el-submenu__title
		//  	color #fff
</style>