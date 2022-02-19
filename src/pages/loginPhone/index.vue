<template>
  <view class="page-warp tabbar-page login-page">
    <view class="login-title">
      登录剧本杀审核平台
    </view>
    <view class="input-label">
      手机号
    </view>
    <view class="input-box">
      <input
        class="input-el"
        type="text"
        placeholder="请输入手机号"
        :value="userPhone"
        @input="(data) => { userPhone = data.detail.value; return data.detail.value }"
      >
    </view>
    <view class="input-label">
      短信验证码
    </view>
    <view class="input-box">
      <input
        class="input-el"
        type="text"
        placeholder="请输入短信验证码"
        :value="code"
        @input="(data) => { code = data.detail.value; return data.detail.value }"
      >
      <view
        class="input-btn"
        :disabled="codeLoading"
        @tap="GetCode"
      >
        {{ !codeLoading ? '获取验证码' : codeTime }}
      </view>
    </view>
    <view class="login-desc">
      <checkbox-group @change="xyChange">
        <checkbox
          color="#417EF3"
          value="xyCheck"
          :checked="checkedList[0] === 'xyCheck'"
        />
      </checkbox-group>
      <view class="desc-text">
        我已阅读并接受
        <text class="desx-a">《隐私政策》</text>
        与
        <text class="desx-a">《用户协议》</text>
      </view>
    </view>
    <view class="btn light login-btn" @tap="LoginFUN">
      确认登陆
    </view>
  </view>
</template>

<script>
import './index.scss'
import store from '@store'
import Taro from '@tarojs/taro'
import { logIn_servers, getCaptcha_servers } from '@api/servers'
export default {
  components: {},
  data () {
    return {
      userPhone: '',
      code: '',
      codeLoading: false,
      codeTime: 60,
      checkedList: []
    }
  },
  methods: {
    GetCode () {
      if (this.codeLoading) return
      const phoneValue = this.userPhone.trim()
      if (phoneValue && /^1[0-9]{10}$/.test(phoneValue)) {
        this.codeLoading = true
        getCaptcha_servers({
          phone: phoneValue,
          type: '1'
        }).then(res => {
          if (res && res.code !== '200') {
            this.codeLoading = false
          } else {
            this.countdown()
          }
        }).catch(() => {
          this.codeLoading = false
        })
      } else {
        Taro.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      }
    },
    countdown () {
      this.codeTime = 60
      const timer = setInterval(() => {
        if (this.codeTime == 0) {
          this.codeLoading = false
          clearInterval(timer)
        } else {
          this.codeTime = this.codeTime - 1
        }
      }, 1000)
    },
    xyChange (data) {
      this.checkedList = event.detail.value
    },
    LoginFUN() {
      const phone = this.userPhone.trim()
      const captcha = this.code.trim()
      if (!phone) {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return false
      }
      if (!captcha) {
        Taro.showToast({
          title: '请输入短信验证码',
          icon: 'none'
        })
        return false
      }
      if (!(this.checkedList.length > 0 && this.checkedList[0] === 'xyCheck')) {
        Taro.showToast({
          title: '请先同意《隐私政策》和《服务条款》',
          icon: 'none'
        })
        return false
      }
      logIn_servers({
        phone,
        captcha,
        platform: 'h5'
      }).then(res => {
        if (res && res.code === '200') {
          const resBody = res.body || {}
          store.commit('set_userInfo', resBody)
          store.commit('set_token', resBody.token)
          Taro.setStorage({
            key: "token",
            data: resBody.token
          })
          Taro.navigateBack({
            delta: 1
          })
          // if (!resBody.nickName && !resBody.avatarUrl) {
          //   // 昵称/头像为空，获取微信数据
          //   store.dispatch('getWxInfo')
          // }
        }
      })
    }
  },
}
</script>
