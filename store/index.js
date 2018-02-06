import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    authUser: null,
    userid: ''
  },
  mutations: {
    SET_USER: (state, accessToken) => {
      state.authUser = accessToken
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    }
  },
  actions: {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    }
  }
})

export default store
