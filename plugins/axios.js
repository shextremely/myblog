import Vue from 'vue'
import * as axios from 'axios'

const options = {
  timeout: 5000,
  headers: {
    post: {
      ' Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

axios.defaults.baseURL = process.env.baseUrl
axios.create(options)

/**
 * [description 目的对axios加载拦截器，如果是url中包含exapi，
 * 表示经过登陆登出API，则访问登陆登出接口]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
axios.interceptors.request.use(config => {
  const lastURL = config.url
  if (config.url.indexOf('/exapi') !== -1) {
    config.url = config.url.replace(config.baseURL, 'http://localhost:3000')
  } else {
    config.url = lastURL
  }
  console.log(config.url)
  return config
})

/**
 * [待补充，返回拦截]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
