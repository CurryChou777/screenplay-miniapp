<template>
  <view class="page-warp tabbar-page info-detail-page">
    <view class="banner-box">
      <image
        class="banner-image"
        mode="aspectFill"
        :src="infoObj.coverImg"
      />
    </view>
    <view class="info-title">
      {{ infoObj.title }}
    </view>
    <view class="info-desc">
      {{ infoObj.source }} {{ infoObj.updateTime }}
    </view>
    <view class="rich-box">
      <rich-text :nodes="richHtml" />
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
      richHtml: '',
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
        this.richHtml = this.formatImg(this.infoObj.content)
      })
    },
    formatImg(html){
      return (html || '')
        .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
        .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
        .replace(/<p>/ig, '<p class="fs-class">')
        .replace(/<span([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<span')
        .replace(/<span([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<span')
        .replace(/<span>/ig, '<span class="fs-class">')
        .replace(/<li([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<li')
        .replace(/<li([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<li')
        .replace(/<li>/ig, '<li class="fs-class">')
        .replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
    },
  }
}
</script>
