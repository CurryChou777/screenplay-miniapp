<template>
  <view class="page-warp upload-page">
    <scroll-view
      class="scroll-box"
      :scroll-y="true"
      @scrolltolower="ScrollMore"
    >
      <view class="list-box">
        <view class="list-item">
          <image
            class="item-img"
            mode="aspectFill"
            src="../../image/header.png"
          />
          <view class="item-right">
            <view class="item-title">
              <view class="title-con textEllipsis2">
                黑暗者修订本（代表作，经典心理咨询入门剧本杀）
              </view>
              <view class="title-label">
                审核未通过
              </view>
            </view>
            <view class="item-time">
              上传时间：2022-12-09 15:30:21
            </view>
            <view class="item-btn">
              <view class="btn">
                删除
              </view>
              <view
                class="btn"
                @tap="goProgress()"
              >
                查看原因
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import './index.scss'
import Taro from '@tarojs/taro'
import { getUserScreenplayListAPI } from '@api/servers'
export default {
  components: {},
  data () {
    return {
      screenList: [],
      page: 1,
      size: 20,
      isLoading: false,
      isLast: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    goProgress() {
      Taro.navigateTo({
        url: '/pages/examinePro/index'
      })
    },
    getList() {
      this.isLoading = true
      const params = {
        page: this.page,
        size: this.size
      }
      getUserScreenplayListAPI(params).then(res => {
        const list = res.body.list || []
        this.page = res.body.pageNumber
        this.isLast = res.body.lastPage
        if (this.page == 1) {
          this.screenList = []
        }
        this.screenList.push(...list)
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    ScrollMore() {
      if (this.isLoading || this.isLast) return
      this.page = ++this.page
      this.getList()
    }
  },
}
</script>
