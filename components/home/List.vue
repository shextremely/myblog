<template>
  <div class="m-list">
    <h3>最新文章</h3>
    <artical v-for="(item, index) in postData" :key="index" :articalInfo="item"></artical>
    <div class="end-artical">无更多文章</div>
  </div>
</template>

<script>
import Artical from '~/components/Artical.vue'
export default {
  props: ['postData'],
  components: {
    Artical
  }
}
</script>

<style lang="scss" scoped>
.m-list{
  h3{
    padding-bottom: 10px;
    border-bottom: 2px solid #000;
  }
  .end-artical {
    padding: 15px;
    text-align: center;
    color: #24292e;
  }
}
</style>
