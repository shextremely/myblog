<template>
<div class="m-ahome">
  <div class="quick-cards">
      <!-- TODO 点击此处的时候左边栏不变化 -->
    <div v-for="(item, index) in quickCards" :key="index" class="box-card" @click="gotoQuickPage(item.path)">
      <i class="icon el-icon-fa-4x" :class="item.icon"></i>
      <p class="title">{{item.name}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      quickCards: [{
        name: '更新Swiper',
        icon: 'el-icon-fa-ravelry',
        path: '/admin/swiper'
      }, {
        name: '写博文',
        icon: 'el-icon-fa-file-text',
        path: '/admin/archives/write'
      }, {
        name: '创建专栏',
        icon: 'el-icon-fa-file-text',
        path: '/admin/columns'
      }, {
        name: '管理标签',
        icon: 'el-icon-fa-user',
        path: '/admin/tags'
      }]
    }
  },
  methods: {
    gotoQuickPage (path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-ahome{
  margin-top: 30px;
  padding: 20px 30px;
  .card-wrap{
    width: 100%;
    height: 100%;
  }
  .quick-cards{
    display: flex;
    justify-content: space-around;
    // width: 100%;
    .box-card{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-basis: 20%;
      height: 150px;
      cursor: pointer;
      background: #fff;
      .title{
        margin-bottom: 0;
      }
    }
  }
}
</style>
