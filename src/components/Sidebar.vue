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
					{name: '用户管理(User)',path: '/useradmin'},
					{
						name: '行程管理(Itinerary)', 
						path: '/jingdian',
						children:[
							{name:'景点(scenic)',path:'/jingdian'},
							{name:'酒店(hotel)',path:'/hotel'},
							{name:'餐厅(restaurant)',path:'/restaurant'},
							// {name:'菜单',path:'/menu'},
							{name:'游览车(bus)',path:'/bus'},
							{name:'游轮(cruises)',path:'/cruises'},
							{name:'导游(tourist)',path:'/tourist'},
							{name:'自费活动(activity)',path:'/activity'},
						]
					},
					{
						name: '公共栏目(Public column)',
						path: '/commonpro',
						children:[
							{name:'基本信息(BaseInfo)',path:'/commonpro/BaseInfo',
							  children:[
							  	{name:'行程(Trip)',path:'/Trip'},
							  	{name:'自费表格(Table)',path:'/SelfTable'},
							  	{name:'出团计划(TPlan)',path:'/TPlan'},
							  	{name:'差价表(Balance sheet)',path:'/ChaJiaTable'},
							  	{name:'热气球须知(HotBall)',path:'/HotBall'},
							  	{name:'埃及行程须知(EgyptTrip)',path:'/EgyptTrip'},
							  	{name:'导游评价模板(Tour evaluation)',path:'/TC'},
							  	{name:'分房表模板(Rooming List)',path:'/FenFang'},
							  ]
							},
							{name:'开会内容(Meeting content)',path:'/MeetingCont'},
							{name:'临时公告(Announcement)',path:'/TempNotice'},
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