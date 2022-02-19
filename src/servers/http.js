import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import store from '../store'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {

  baseOptions(params, method = "GET", type = '') {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    if (type == 'file') {
      const option = {
        url: BASE_URL + url,
        filePath: data,
        name: 'file',
        header: {
          'content-type': contentType,
          'Authorization': store.state.token,
          'token': store.state.token,
          'Cookie': `adminToken=${store.state.token}`
        }
      };
      return Taro.uploadFile(option)
    } else {
      if (data) {
        // data.serviceAreaId = store.state.serviceAreaObj.id
        // data.longitude = store.state.locationObj.longitude
        // data.latitude = store.state.locationObj.latitude
      } else {
        // data = {
        //   serviceAreaId: store.state.serviceAreaObj.id,
        //   longitude: store.state.locationObj.longitude,
        //   latitude: store.state.locationObj.latitude
        // }
      }
      const option = {
        url: BASE_URL + url,
        data: data,
        method: method,
        header: {
          'content-type': contentType,
          'Authorization': store.state.token,
          'token': store.state.token,
          'Cookie': `adminToken=${store.state.token}`
        }
      };
      return Taro.request(option);
    }
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  file(url, data) {
    let params = {
      url,
      data,
      contentType: "multipart/form-data"
    }
    return this.baseOptions(params, "POST", "file");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()
