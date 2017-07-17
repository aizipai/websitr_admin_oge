// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'font-awesome/css/font-awesome.min.css'
import '@/common/sass/vars.scss'
import '@/common/sass/reset.scss'
import '@/common/stylus/reset.styl'

import store from './store'
import Vuex from 'vuex'

import axios from 'axios'
import API_URL from './api/index.js'

import Filters from './filters/index.js'

window.API_URL = API_URL //声明全局变量  

Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(Vuex)

for(let filter in Filters){
	Vue.filter(filter, Filters[filter]);
}


Vue.config.productionTip = false


router.beforeEach((to,from,next)=>{

	// console.log(to)
	// console.log(from)
	// if(!sessionStorage.getItem('userAccount') || !sessionStorage.getItem('userPassword')){
	// 	if(!flag){
	// 		next({path:'/login'})
	// 	}else{
	// 		next()
	// 	}
	// }else{
	// 	next()
	// }
	next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // filters:Filters,
  template: '<App/>',
  components: { App },
  methods:{
  	checkLogin(){
  		if(!sessionStorage.getItem('userAccount') || !sessionStorage.getItem('userPassword')){
  			this.$message('请登录')
  			this.$router.push({ path: '/login' })
  		}
  	}
  },
  mounted(){
  	this.checkLogin()
  },
})
