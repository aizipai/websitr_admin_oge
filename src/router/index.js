import Vue from 'vue'
import Router from 'vue-router'

import Home from '../page/Home.vue' //以下是Home子路由
      //1.订单管理
      import UserAdmin from '../page/UserAdmin.vue'
      //2.行程管理
      import JingDian from '../page/travel_admin/JingDian.vue'  //景点
      import Hotel from '../page/travel_admin/Hotel.vue'  //酒店
      import Restaurant from '../page/travel_admin/Restaurant.vue'  //餐厅

        import Menu from '../page/travel_admin/Menu.vue'  //菜单

      import Cruises from '../page/travel_admin/Cruises.vue'  //游轮
      import Bus from '../page/travel_admin/Bus.vue'  //游览车
      import Tourist from '../page/travel_admin/Tourist.vue'  //导游
      import Activity from '../page/travel_admin/Activity.vue'  //自费活动
     
      //3.订单管理
      import RightAdmin from '../page/RightAdmin.vue'
      //4.公共栏目
      import CommonPro from '../page/CommonPro.vue'
      import MeetingCont from '../page/common_admin/MeetingCont.vue'//开会内容
      import TempNotice from '../page/common_admin/TempNotice.vue'//临时公告
          // 基本信息
                import Trip from '../page/common_admin/BaseInfo/Trip.vue'//行程
                import SelfTable from '../page/common_admin/BaseInfo/SelfTable.vue'//自费表格
                import TPlan from '../page/common_admin/BaseInfo/TPlan.vue'//出团计划
                import ChaJiaTable from '../page/common_admin/BaseInfo/ChaJiaTable.vue'//差价表
                import HotBall from '../page/common_admin/BaseInfo/HotBall.vue'//热气球须知
                import EgyptTrip from '../page/common_admin/BaseInfo/EgyptTrip.vue'//埃及行程须知
                import TC from '../page/common_admin/BaseInfo/TC.vue'//导游评价模板
                import FenFang from '../page/common_admin/BaseInfo/FenFang.vue'//分房表模板
import Login from '../page/Login.vue' //登录
import NotFind from  '../page/404.vue' //404
import Test from '../page/Test.vue' //测试


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {path:'/useradmin'}
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/useradmin', component: UserAdmin, name: '用户管理'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/jingdian', component: JingDian, name: '景点'},
            { path: '/hotel', component: Hotel, name: '酒店' },
            { path: '/restaurant', component: Restaurant, name: '餐厅' },
            { path: '/bus', component: Bus, name: '游览车' },
            { path: '/cruises', component: Cruises, name: '游轮' },
            { path: '/tourist', component: Tourist, name: '导游' },
            { path: '/activity', component: Activity, name: '自费活动' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航三',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/rightadmin', component: RightAdmin, name: '权限管理'},
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '导航四',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: 'MeetingCont',component: JingDian,name: '开会内容'},
            {path: 'TempNotice',component: TempNotice,name: '临时公告'},
            {path: 'Trip',component: Trip,name: '行程'},
            {path: 'SelfTable',component: SelfTable,name: '自费表格'},
            {path: 'TPlan',component: TPlan,name: '出团计划'},
            {path: 'ChaJiaTable',component: ChaJiaTable,name: '差价表'},
            {path: 'HotBall',component: HotBall,name: '热气球须知'},
            {path: 'EgyptTrip',component: EgyptTrip,name: '埃及行程须知'},
            {path: 'TC',component: TC,name: '导游评价模板'},
            {path: 'FenFang',component: FenFang,name: '分房表模板'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航四',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: 'menu/:id',component: Menu,name: '菜单'}
        ]
    },
    {
    	path: '/login',
      	name: '登录',
      	component: Login	
    },
    {
    	path: '/404',
      	name: 'NotFind',
      	component: NotFind	
    },
    {
      path: '/test',
        name: '测试',
        component: Test  
    },
    {
    	path: '*',
      	name: '',
      	redirect: {path: '/404'}
    }
  ]
})
