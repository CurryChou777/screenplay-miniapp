<template>
  <view class="page-warp progress-page">
    <image
      v-if="detailObj.status == '-1'"
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon1.png"
    />
    <image
      v-else-if="detailObj.status == '10'"
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon2.png"
    />
    <image
      v-else
      class="progress-img"
      mode="aspectFill"
      src="../../image/progress-icon3.png"
    />
    <view class="progress-text">
      {{ statusMap[detailObj.status] }}
    </view>
    <view class="progress-con">
      <AtTimeline
        class="screenplay-time-line"
        :class="[lineClass[detailObj.status]]"
        :items="timeList"
      />
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtTimeline } from 'taro-ui-vue'
import { getScreenplayInfoAPI } from '@api/servers'
import "taro-ui-vue/dist/style/components/timeline.scss"
import "taro-ui-vue/dist/style/components/icon.scss"
import './index.scss'
export default {
  components: {
    AtTimeline
  },
  data () {
    return {
      detailId: "",
      timeList: [],
      detailObj: {},
      statusMap: {
        "-1": "审核不通过",
        "0": "提交审核",
        "1": "审核中",
        "10": "审核通过"
      },
      lineClass: {
        "-1": "time-line3",
        "0": "time-line1",
        "1": "time-line2",
        "10": "time-line3"
      }
    }
  },
  created() {
    this.detailId = getCurrentInstance().router.params.id || ''
    this.getDetail()
  },
  methods: {
    getDetail() {
      getScreenplayInfoAPI({
        screenplayId: this.detailId
      }).then(res => {
        this.detailObj = res.body
        let auditResult = ''
        if (this.detailObj.status == '-1') {
          auditResult = `：${this.detailObj.auditDesc}`
        } else if (this.detailObj.status == '10') {
          auditResult = `：审核通过`
        }
        this.timeList = [
          {
            title: "提交审核",
            content: [this.detailObj.addTime || '--'],
          },
          {
            title: "开始审核",
            content: [this.detailObj.startAuditTime || '--'],
          },
          {
            title: "审核结果" + auditResult,
            content: [this.detailObj.auditTime || '--'],
          }
        ]
      })
    }
  },
}
</script>
