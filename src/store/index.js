import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginInfo:{

		}
	},
	actions:{

	},
	mutations: {
		SET_LOGININFO:(state,object)=>{
			state.loginInfo = object
		}

	},
	getters: {
		loginInfo(state,gettters){
			return state.loginInfo
		}
	}
})

export default store