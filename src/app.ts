import Vue from 'vue'
import store from './store'
import './app.scss'
import Taro from '@tarojs/taro'

const App = {
  store,
  onShow (options) {
    try {
      var value = Taro.getStorageSync('token')
      if (value) {
        store.commit('set_token', value)
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
