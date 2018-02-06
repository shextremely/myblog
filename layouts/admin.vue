<template>
<div class="m-admin">
  <nav-menu :notCollapse="notCollapse" @convertActiveIndex="convertActiveIndex" :routers="navMenuRouters" :activeIndex="navMenuActiveIndex"></nav-menu>
  <div class="g-right" :class="{hasCollapse: !notCollapse}">
    <top-header :notCollapse="notCollapse"></top-header>
    <section class="m-awrap">
      <nuxt/>
    </section>
  </div>
</div>
</template>

<script>
import TopHeader from '~/components/admin/TopHeader.vue'
import NavMenu from '~/components/admin/NavMenu.vue'
export default {
  components: {
    TopHeader,
    NavMenu
  },
  data () {
    return {
      notCollapse: true,
      navMenuRouters: [{
        index: '1',
        name: '首页',
        icon: 'el-icon-fa-home',
        path: '/admin'
      }, {
        index: '2',
        name: '博文',
        icon: 'el-icon-fa-file-text',
        path: '/admin/archives',
        childrens: [{
          index: '2-1',
          name: '写博文',
          icon: 'el-icon-fa-file-text',
          path: '/admin/archives/write'
        }, {
          index: '2-2',
          name: '管理博文',
          icon: 'el-icon-fa-file-text',
          path: '/admin/archives/manage'
        }]
      }, {
        index: '3',
        name: '标签',
        icon: 'el-icon-fa-user',
        path: '/admin/tags'
      }, {
        index: '4',
        name: '专栏',
        icon: 'el-icon-fa-suitcase',
        path: '/admin/columns',
        childrens: [{
          index: '4-1',
          name: '创建专栏',
          icon: 'el-icon-fa-file-text',
          path: '/admin/columns/write'
        }, {
          index: '4-2',
          name: '管理专栏',
          icon: 'el-icon-fa-file-text',
          path: '/admin/columns/manage'
        }]
      }, {
        index: '5',
        name: '关于',
        icon: 'el-icon-fa-address-card',
        path: '/admin/about'
      }, {
        index: '6',
        name: '留言',
        icon: 'el-icon-fa-comment',
        path: '/admin/contact'
      }],
      navMenuActiveIndex: '1'
    }
  },
  created () {
    // 刷新页面时通过route改变左侧导航的位置
    let routerPath = this.$route.path
    let router = this.navMenuRouters.find(router => {
      return router.childrens ? router.childrens.find(child => child.path === routerPath) : router.path === routerPath
    })
    if (!router) {
      this.navMenuActiveIndex = '1'
      return
    }
    // 判断router对象是否有childrens，如果有，再次匹配子router
    router = router.childrens ? router.childrens.find(child => child.path === routerPath) : router
    this.navMenuActiveIndex = router.index ? router.index : '1'
  },
  methods: {
    getCurrentRouter (key) {
      let router = this.navMenuRouters.find(router => {
        return router.childrens ? router.childrens.find(child => child.index === key) : router.index === key
      })
      // 判断router对象是否有childrens，如果有，再次匹配子router
      router = router.childrens ? router.childrens.find(child => child.index === key) : router
      return router
    },
    convertActiveIndex (key) {
      let router = this.getCurrentRouter(key)
      this.navMenuActiveIndex = router.index ? router.index : '1'
      this.$router.push({
        path: router.path
      })
    }
  }
}
</script>

<style lang="scss">
.m-admin {
    display: flex;
    background: #f0f3f4;
    .g-right {
        flex-basis: 85%;
        &.hasCollapse {
            flex-basis: 95%;
        }
    }

}
</style>
