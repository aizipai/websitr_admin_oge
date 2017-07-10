import Vue from 'vue'
import Router from 'vue-router'

import Home from '../page/Home.vue' //以下是Home子路由
      //1.订单管理
      import UserAdmin from '../page/UserAdmin.vue'
      //2.行程管理
      import JingDian from '../page/travel_admin/JingDian.vue'  //景点
      import Hotel from '../page/travel_admin/Hotel.vue'  //酒店
      import Restaurant from '../page/travel_admin/Restaurant.vue'  //餐厅
      import Cruises from '../page/travel_admin/Cruises.vue'  //游轮
      import Bus from '../page/travel_admin/Bus.vue'  //游览车
      import Tourist from '../page/travel_admin/Tourist.vue'  //导游
      import Activity from '../page/travel_admin/Activity.vue'  //自费活动
      //3.订单管理
      import RightAdmin from '../page/RightAdmin.vue'
      //4.公共栏目
      import CommonPro from '../page/CommonPro.vue'


import Login from '../page/Login.vue' //登录
import NotFind from  '../page/404.vue' //404


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
            { path: '/activity', component: Activity, name: '资费活动' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/rightadmin', component: RightAdmin, name: '权限管理'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航四',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/commonpro', component: CommonPro, name: '公共栏目'},
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
    	path: '*',
      	name: '',
      	redirect: {path: '/404'}
    }
  ]
})
