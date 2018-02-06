<template>
  <ul class="m-category-menu">
    <li v-for="item in categoriesList" :key="item.index" :class="{active: activeIndex === +item.index}" @click="getCate(item)">{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  props: ['categoriesList', 'activeIndex'],
  components: {
  },
  methods: {
    getCate (item) {
      this.$router.push({
        path: `/archives/${item.name}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-category-menu{
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-left: 0;
  font: 12px/1.5 'Microsoft Yahei', 'Simsun';
  li{
    text-align: center;
    padding: 5px 2px;
    width: 90px;
    cursor: pointer;
    &.active{
      color: #409eff;
    }
  }
}
</style>
