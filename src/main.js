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

Vue.prototype.$axios = axios


Vue.use(ElementUI)
Vue.use(Vuex)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
