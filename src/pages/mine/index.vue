<template>
  <view class="page-warp tabbar-page mine-page">
    <view
      v-if="token && userInfo.uid"
      class="head-box"
    >
      <AtAvatar
        circle
        :image="userInfo.avatarUrl"
      />
      <view class="head-name">
        {{ userInfo.nickName || userInfo.account || '--' }}
      </view>
    </view>
    <view
      v-else
      class="head-box"
      @tap="goPage('/pages/loginPhone/index')"
    >
      <AtAvatar
        circle
        :image="defaultHeader"
      />
      <view class="head-name">
        点击登录
      </view>
    </view>
    <view class="list-box">
      <view class="list-title">
        剧本管理
      </view>
      <view
        class="list-item"
        @tap="goPage('/pages/myUpload/index')"
      >
        <view class="item-left">
          <image
            class="item-icon"
            mode="aspectFill"
            src="../../image/nav1.png"
          />
          <view class="item-name">
            我上传的
          </view>
        </view>
        <AtIcon
          value="chevron-right"
          size="20"
          color="#cccccc"
        />
      </view>
      <!-- 会默认触发onClick事件 -->
      <!-- <AtList :has-border="false">
        <AtListItem
          title="我上传的"
          arrow="right"
          thumb="../../image/nav1.png"
          :on-click="goPage('/pages/myUpload/index')"
        />
      </AtList> -->
    </view>
    <AtTabBar
      fixed
      color="#ccc"
      selected-color="#000"
      :tab-list="tabList"
      :current="2"
      :on-click="index => tabbarHandle(index, 2)"
    />
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import store from '@store'
import { AtTabBar, AtAvatar, AtList, AtListItem, AtIcon } from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/tab-bar.scss"
import "taro-ui-vue/dist/style/components/badge.scss"
import "taro-ui-vue/dist/style/components/avatar.scss"
import "taro-ui-vue/dist/style/components/list.scss"
import "taro-ui-vue/dist/style/components/icon.scss"
import './index.scss'
import { tabbarList, tabbarHandle } from '../../util'
import Taro from '@tarojs/taro'
export default {
  components: {
    AtTabBar,
    AtAvatar,
    // AtList,
    // AtListItem,
    AtIcon
  },
  data () {
    return {
      tabList: tabbarList,
      defaultHeader: require('../../image/header.png'),
    }
  },
  computed: {
    token() {
      return store.state.token
    },
    userInfo() {
      return store.state.userInfo
    }
  },
  methods: {
    tabbarHandle,
    goPage(url) {
      Taro.navigateTo({
        url: url
      })
    }
  },
}
</script>
