<template>
<nav class="m-category">
  <ul class="list">
    <li v-for="(item, index) in categoryList" :key="index" class="item" :class="{'active': activeIndex === index}" @click="transMenu(item, index)">
      <span v-text="item.name"></span>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['categoryList', 'categoryActiveIndex'],
  data () {
    return {
      activeIndex: this.categoryActiveIndex
    }
  },
  methods: {
    transMenu (item, index) {
      this.activeIndex = index
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-category {
    .list {
        display: flex;
        .item {
            padding: 0 10px;
            cursor: pointer;
            &:first-child {
                padding-left: 0;
            }
            &:last-child {
                padding-right: 0;
            }
        }
        .active{
          color: #409eff;
        }
    }
}
</style>
