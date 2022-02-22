import Taro from '@tarojs/taro'
export const tabbarList = [
  {
    title: '首页',
    image: require("./image/icon1.png"),
    selectedImage: require("./image/icon1-on.png"),
    src: '/pages/index/index'
  },
  {
    title: '审核',
    image: require("./image/icon2.png"),
    selectedImage: require("./image/icon2-on.png"),
    src: '/pages/examine/index'
  },
  {
    title: '我的',
    image: require("./image/icon3.png"),
    selectedImage: require("./image/icon3-on.png"),
    src: '/pages/mine/index'
  }
]
export const tabbarHandle = (index, curr) => {
  console.log(index)
  console.log(tabbarList[index])
  if (index === curr) return
  Taro.redirectTo({
    url: tabbarList[index].src
  })
}
