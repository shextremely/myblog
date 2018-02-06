<template>
<el-carousel :interval="4000" trigger="click" height="300px">
  <el-carousel-item v-for="item in swiperData" :key="item.articalid" @click="gotoDetailPage(item.articalid)">
    <h3 :style="{display: !item.imageUrl ? 'inline-block' : 'none'}">{{item.title}}</h3>
    <img :src="item.imageUrl" :alt="item.title" :style="{display: item.imageUrl ? 'inline-block' : 'none'}">
  </el-carousel-item>
</el-carousel>
</template>

<script>
export default {
  props: ['swiperData'],
  methods: {
    gotoDetailPage (articalid) {
      this.$router.push({
        path: `/archives/artical/${articalid}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
