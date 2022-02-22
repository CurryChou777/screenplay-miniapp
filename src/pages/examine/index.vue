<template>
  <view class="page-warp tabbar-page examine-page">
    <view class="examine-p1">
      上传你的剧本
    </view>
    <view class="examine-p2">
      请用电脑浏览器打开网站进行剧本上传
    </view>
    <view class="examine-box">
      <image
        class="img"
        mode="aspectFill"
        src="../../image/icon-pc.png"
      />
      <view class="p1">
        用电脑浏览器打开
      </view>
      <view class="p2">
        {{ webUrl }}
      </view>
    </view>
    <AtTabBar
      fixed
      color="#ccc"
      selected-color="#000"
      :tab-list="tabList"
      :current="1"
      :on-click="index => tabbarHandle(index, 1)"
    />
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtTabBar } from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/tab-bar.scss"
import "taro-ui-vue/dist/style/components/badge.scss"
import './index.scss'
import { tabbarList, tabbarHandle } from '../../util'
const WEB_URL = window.CONFIG.WEB_URL
export default {
  components: {
    AtTabBar
  },
  data () {
    return {
      tabList: tabbarList,
      webUrl: WEB_URL
    }
  },
  methods: {
    tabbarHandle
  },
}
</script>
