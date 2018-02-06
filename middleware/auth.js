/*
* @Author: Thinkpad
* @Date:   2017-09-27 16:04:32
* @Last Modified by:   Thinkpad
* @Last Modified time: 2017-10-10 16:06:45
*/
const jwt = require('jsonwebtoken')

export default function ({ isServer, isClient, route, store, req, redirect, error }) {
  if (!isServer) return
  if (!route.path.includes('admin')) return
  const token = req.session.authUser
  const cookieToken = req.headers.cookie && req.headers.cookie.split(';').filter(Cookie => {
    let parts = Cookie.split('=')
    if (parts[0].trim() === 'accessToken') {
      return true
    }
  })

  if (token && cookieToken.length > 0 && token === cookieToken[0].split('=')[1].trim()) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        store.commit('SET_USERID', '')
        store.commit('SET_USER', null)
        redirect('/login')
      } else {
        let userid = decoded.userid
        store.commit('SET_USERID', userid)
        store.commit('SET_USER', token)
      }
    })
  } else {
    store.commit('SET_USERID', '')
    store.commit('SET_USER', null)
    redirect('/login')
  }
}
