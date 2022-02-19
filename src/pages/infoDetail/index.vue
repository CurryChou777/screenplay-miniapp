<template>
  <view class="page-warp tabbar-page info-detail-page">
    <view class="banner-box">
      <image
        class="banner-image"
        mode="aspectFill"
        src="../../image/login-head.png"
      />
    </view>
    <view class="info-title">
      《黑暗者》获TGA玩家之声奖，多款剧本杀游戏将在颁奖典礼公布新消息
    </view>
    <view class="info-desc">
      来源：中国传媒集团官网 2022-12-09 15:30:21
    </view>
  </view>
</template>

<script>
import './index.scss'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getInformationInfoAPI } from '@api/servers'
export default {
  components: {},
  data () {
    return {
      infoObj: {},
      detailId: 0,
      titleName: ''
    }
  },
  created() {
    this.detailId = getCurrentInstance().router.params.id || ''
    this.titleName = getCurrentInstance().router.params.title || ''
    Taro.setNavigationBarTitle({
      title: this.titleName
    })
    this.getInfoDetail()
  },
  methods: {
    getInfoDetail() {
      const params = {
        id: this.detailId
      }
      getInformationInfoAPI(params).then(res => {
        this.infoObj = res.body || {}
      })
    },
  }
}
</script>
