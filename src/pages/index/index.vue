<template>
  <view class="page-warp tabbar-page index-page">
    <view class="banner-box">
      <image
        class="banner-image"
        mode="aspectFill"
        src="../../image/login-head.png"
      />
    </view>
    <view class="home-tab-box">
      <view
        v-for="(item, index) in homeTab"
        :key="item.value"
        class="home-tab-item"
        :class="{on: index === activeIndex}"
        @tap="changeTab(index)"
      >
        {{ item.label }}
      </view>
    </view>
    <view class="home-list">
      <scroll-view
        v-show="activeIndex == 0"
        class="scroll-box"
        :scroll-y="true"
        @scroll="ScrollFun"
        @scrolltolower="ScrollMore"
      >
        <view
          v-for="item in tab0Obj.list"
          :key="item.id"
          class="list-item"
          @tap="GoDetail(item)"
        >
          <image
            class="item-image"
            mode="aspectFill"
            :src="item.coverImg"
          />
          <view class="item-info">
            <view class="info-title textEllipsis2">
              {{ item.title }}
            </view>
            <view class="info-desc">
              <text>{{ item.source }}</text>
              <text>{{ (item.addTime || '').split(" ")[0] }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
      <scroll-view
        v-show="activeIndex == 1"
        class="scroll-box"
        :scroll-y="true"
        @scroll="ScrollFun"
        @scrolltolower="ScrollMore"
      >
        <view
          v-for="item in tab1Obj.list"
          :key="item.id"
          class="list-item"
          @tap="GoDetail(item)"
        >
          <image
            class="item-image"
            mode="aspectFill"
            :src="item.coverImg"
          />
          <view class="item-info">
            <view class="info-title textEllipsis2">
              {{ item.title }}
            </view>
            <view class="info-desc">
              <text>{{ item.source }}</text>
              <text>{{ (item.addTime || '').split(" ")[0] }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <AtTabBar
      fixed
      color="#ccc"
      selected-color="#000"
      :tab-list="tabList"
      :current="0"
      :on-click="index => tabbarHandle(index, 0)"
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
import { getInformationListAPI } from '@api/servers'
import Taro from '@tarojs/taro'
export default {
  components: {
    AtTabBar
  },
  data () {
    return {
      tabList: tabbarList,
      activeIndex: 0,
      homeTab: [
        {
          label: '官方公告',
          value: '1'
        },
        {
          label: '业内资讯',
          value: '2'
        }
      ],
      scrollTop: 0,
      size: 20,
      tab0Obj: {
        page: 1,
        list: [],
        isLast: false,
        isLoading: false
      },
      tab1Obj: {
        page: 1,
        list: [],
        isLast: false,
        isLoading: false
      }
    }
  },
  created() {
    this.getInfoList(0)
    this.getInfoList(1)
  },
  methods: {
    tabbarHandle,
    changeTab(index) {
      this.activeIndex = index
    },
    getInfoList(index) {
      const activeIndex = index || this.activeIndex
      this[`tab${activeIndex}Obj`].isLoading = true
      const params = {
        page: this[`tab${activeIndex}Obj`].page,
        size: this.size,
        type: this.homeTab[activeIndex].value
      }
      getInformationListAPI(params).then(res => {
        const list = res.body.list || []
        this.$set(this[`tab${activeIndex}Obj`], 'page', res.body.pageNumber)
        this.$set(this[`tab${activeIndex}Obj`], 'isLast', res.body.lastPage)
        if (this[`tab${activeIndex}Obj`].page == 1) {
          this.$set(this[`tab${activeIndex}Obj`], 'list', [])
        }
        this[`tab${activeIndex}Obj`].list.push(...list)
        this.$set(this[`tab${activeIndex}Obj`], 'isLoading', false)
      }).catch(() => {
        this.$set(this[`tab${activeIndex}Obj`], 'isLoading', false)
      })
    },
    ScrollFun(e) {
      this.scrollTop = e.detail.scrollTop
    },
    ScrollMore() {
      const activeIndex = this.activeIndex
      const activeObj = this[`tab${activeIndex}Obj`]
      if (activeObj.isLoading || activeObj.isLast) return
      this.$set(this[`tab${activeIndex}Obj`], 'page', ++activeObj.page)
      this.getInfoList()
    },
    GoDetail(item) {
      Taro.navigateTo({
        url: `/pages/infoDetail/index?id=${item.id}&title=${this.homeTab[this.activeIndex].label}`,
      })
    }
  }
}
</script>
