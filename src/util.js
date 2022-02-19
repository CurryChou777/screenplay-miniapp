import Taro from '@tarojs/taro'
export const tabbarList = [
  {
    title: '首页',
    image: 'https://static.css.jmylm.cn/img/icon1.png',
    selectedImage: 'https://static.css.jmylm.cn/img/icon1-on.png',
    src: '/pages/index/index'
  },
  {
    title: '审核',
    image: 'https://static.css.jmylm.cn/img/icon2.png',
    selectedImage: 'https://static.css.jmylm.cn/img/icon2-on.png',
    src: '/pages/examine/index'
  },
  {
    title: '我的',
    image: 'https://static.css.jmylm.cn/img/icon3.png',
    selectedImage: 'https://static.css.jmylm.cn/img/icon3-on.png',
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
