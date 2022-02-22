<template>
  <view class="page-warp upload-page">
    <scroll-view
      class="scroll-box"
      :scroll-y="true"
      @scrolltolower="ScrollMore"
    >
      <view class="list-box">
        <view
          v-for="item in screenList"
          :key="item.id"
          class="list-item"
          @tap="goProgress(item)"
        >
          <image
            class="item-img"
            mode="aspectFill"
            :src="item.coverUrl"
          />
          <view class="item-right">
            <view class="item-title">
              <view class="title-con textEllipsis2">
                {{ item.title }}
              </view>
              <view class="title-label">
                {{ statusMap[item.status] }}
              </view>
            </view>
            <view class="item-time">
              上传时间：{{ item.addTime }}
            </view>
            <!-- 审核不通过 -->
            <view
              v-if="item.status == '-1'"
              class="item-btn"
            >
              <view
                class="btn"
                @tap.stop="delItem(item)"
              >
                删除
              </view>
              <view
                class="btn"
                @tap.stop="showResule(item)"
              >
                查看原因
              </view>
            </view>
            <!-- 审核通过 -->
            <view
              v-else-if="item.status == '10'"
              class="item-btn"
            >
              <view
                class="btn"
                @tap.stop="puton(item)"
              >
                上架
              </view>
            </view>
            <!-- 审核中 -->
            <view
              v-else-if="item.status == '1'"
              class="item-btn"
            >
              <view
                class="btn"
              >
                查看进度
              </view>
            </view>
            <view
              v-else
              class="item-btn"
            >
              <view
                class="btn"
                @tap.stop="cancel(item)"
              >
                取消审核
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
import { getUserScreenplayListAPI, deleteScreenplayAPI, cancelAuditAPI } from '@api/servers'
export default {
  components: {},
  data () {
    return {
      screenList: [],
      page: 1,
      size: 30,
      isLoading: false,
      isLast: false,
      statusMap: {
        "-1": "审核不通过",
        "0": "提交审核", // 待审核
        "1": "审核中",
        "10": "审核通过"
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    goProgress(item) {
      Taro.navigateTo({
        url: '/pages/examinePro/index?id=' + item.id
      })
    },
    showResule(item) {
      Taro.showModal({
        title: '原因',
        content: item.auditDesc,
        confirmColor: '#417EF3',
        showCancel: false,
        success: function (res) {}
      })
    },
    // 取消审核
    cancel(item) {
      Taro.showModal({
        title: '取消审核',
        content: '改剧本正在审核中，确定取消吗？',
        confirmColor: '#417EF3',
        success: (r) => {
          if (r.errMsg === 'confirm') {
            cancelAuditAPI({
              screenplayId: item.id
            }).then(res => {
              if (res.code == '200') {
                this.page = 1
                this.getList()
              }
            })
          }
        }
      })
    },
    // 删除
    delItem(item) {
      Taro.showModal({
        title: '删除剧本',
        content: '确定要删除这条记录吗？',
        confirmColor: '#417EF3',
        success: (r) => {
          if (r.errMsg === 'confirm') {
            deleteScreenplayAPI({
              screenplayId: item.id
            }).then(res => {
              if (res.code == '200') {
                this.page = 1
                this.getList()
              }
            })
          }
        }
      })
    },
    // 上架-不处理
    puton(item) {},
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
