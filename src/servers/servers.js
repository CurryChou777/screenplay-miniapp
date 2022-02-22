import HTTPREQUEST from "./http"
// 全局搜索
export const searchTarget_servers = (postData) => {
  return HTTPREQUEST.post('/api/search/searchTarget', postData)
}

// 配置信息
export const getConfigs_servers = (postData) => {
  return HTTPREQUEST.post('/api/common/getConfigs', postData)
}
// 上传图片
export const upload_servers = (postData) => {
  return HTTPREQUEST.file('/api/common/upload', postData)
}
// 验证码
export const getCaptcha_servers = (postData) => {
  return HTTPREQUEST.post('/api/common/getCaptcha', postData)
}
// 验证码登录
export const logIn_servers = (postData) => {
  return HTTPREQUEST.post('/api/logIn/logIn', postData)
}
// 小程序登录
export const miniAppLogIn_servers = (postData) => {
  return HTTPREQUEST.post('/api/logIn/miniAppLogIn', postData)
}
// 小程序登录
export const bindMiniAppPhone_servers = (postData) => {
  return HTTPREQUEST.post('/api/logIn/bindMiniAppPhone', postData)
}
// 用户信息
export const getUserInfo_servers = (postData) => {
  return HTTPREQUEST.post('/api/userCenter/getUserInfo', postData)
}
// 修改用户信息
export const changeUserInfo_servers = (postData) => {
  return HTTPREQUEST.post('/api/userCenter/changeUserInfo', postData)
}
// 退出登录
export const logout_servers = (postData) => {
  return HTTPREQUEST.post('/api/userCenter/logout', postData)
}


// 资讯模块
// 资讯列表
export const getInformationListAPI = (postData) => {
  return HTTPREQUEST.get('/api/information/getInformationList', postData)
}
// 资讯详情
export const getInformationInfoAPI = (postData) => {
  return HTTPREQUEST.post('/api/information/getInformationInfo', postData)
}
// 资讯搜索
export const searchInformationAPI = (postData) => {
  return HTTPREQUEST.post('/api/information/searchInformation', postData)
}

// 剧本模块
// 用户剧本列表
export const getUserScreenplayListAPI = (postData) => {
  return HTTPREQUEST.post('/api/screenplay/getUserScreenplayList', postData)
}
// 剧本详情
export const getScreenplayInfoAPI = (postData) => {
  return HTTPREQUEST.post('/api/screenplay/getScreenplayInfo', postData)
}
// 剧本删除
export const deleteScreenplayAPI = (postData) => {
  return HTTPREQUEST.post('/api/screenplay/deleteScreenplay', postData)
}
// 取消审核
export const cancelAuditAPI = (postData) => {
  return HTTPREQUEST.post('/api/screenplay/withdrawScreenplay', postData)
}
