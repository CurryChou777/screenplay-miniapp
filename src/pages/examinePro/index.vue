<template>
  <view class="page-warp progress-page">
    <image
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon1.png"
    />
    <view class="progress-text">
      审核未通过
    </view>
    <image
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon2.png"
    />
    <view class="progress-text">
      审核成功
    </view>
    <image
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon3.png"
    />
    <view class="progress-text">
      审核中/提交审核
    </view>
    <view class="progress-con">
      <AtTimeline
        class="screenplay-time-line time-line3"
        :items="timeList"
      />
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtTimeline } from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/timeline.scss"
import "taro-ui-vue/dist/style/components/icon.scss"
import './index.scss'
export default {
  components: {
    AtTimeline
  },
  data () {
    return {
      timeList: [
        {
          title: "提交审核",
          content: ["2022-02-02 11:11:11"],
        },
        {
          title: "开始审核",
          content: ["2022-02-02 11:11:11"],
        },
        {
          title: "审核结果",
          content: ["2022-02-02 11:11:11"],
        }
      ]
    }
  },
  methods: {
  },
}
</script>
