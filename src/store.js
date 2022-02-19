import Vue from 'vue'
import Vuex from 'vuex'
import Taro from '@tarojs/taro'
import { getUserInfo_servers } from '@api/servers'
Vue.use(Vuex)

const state = {
  token: '',
  userInfo: {},
  isIphoneX: false,
}

const mutations = {
  set_token(state, data) {
    state.token = data
    store.dispatch('getUserInfo')
  },
  set_userInfo(state, data) {
    state.userInfo = data
  },
  set_isIphoneX(state, data) {
    state.isIphoneX = data
  }
}

const actions = {
  getSystemConfig({state, commit}) {
  },
  getUserInfo({state, commit}) {
    if (!state.token) return
    getUserInfo_servers().then(res => {
      commit('set_userInfo', res.body || {})
    })
  }
}

const getters = {
  getToken({state}) {
    return state.token
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
