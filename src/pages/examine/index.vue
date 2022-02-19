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
        src="../../image/ic_order_mine@2x.png"
      />
      <view class="p1">
        用电脑浏览器打开
      </view>
      <view class="p2">
        www.jubenshenhe.com
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
export default {
  components: {
    AtTabBar
  },
  data () {
    return {
      tabList: tabbarList
    }
  },
  methods: {
    tabbarHandle
  },
}
</script>
