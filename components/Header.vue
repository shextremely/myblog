<template>
<header class="m-header">
  <about-page></about-page>
  <div class="header">
    <div class="title">
      <nuxt-link to="/">
        FRONTEND
      </nuxt-link>
    </div>
    <category :categoryList="categoryList" :categoryActiveIndex="categoryActiveIndex"></category>
  </div>
</header>
</template>

<script>
import AboutPage from '~/components/AboutPage.vue'
import Category from '~/components/Category.vue'
export default {
  components: {
    AboutPage,
    Category
  },
  data () {
    return {
      categoryList: [{
        name: 'HOME',
        path: '/'
      }, {
        name: 'CATEGORIES',
        path: '/archives'
      }, {
        name: 'COLUMNS',
        path: '/columns'
      }, {
        name: 'ABOUT',
        path: '/about'
      }, {
        name: 'CONTACT',
        path: '/'
      }],
      categoryActiveIndex: 0
    }
  },
  created () {
    this.categoryActiveIndex = this.categoryList.findIndex(item => item.path === this.$route.path)
    console.log(this.categoryActiveIndex)
  },
  methods: {
  }
}
</script>

<style lang="scss">
.m-header {
    .header {
        width: 80%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }
    ul {
        list-style: none;
        margin: 0;
    }
}
</style>
