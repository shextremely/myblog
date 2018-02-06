<template>
  <ul class="suggested-tag-list">
    <li v-for="(item, index) in alternativeTags" @click="emitTagsName">{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: ['alternativeTags'],
  methods: {
    emitTagsName (event) {
      let tagName = event.target.innerHTML
      this.$emit('selectedTag', tagName)
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    width: 200px;
    list-style: none;
    z-index: 100;
    background: #fff;
    border: 1px solid #ddd;
    padding-left: 0;
    margin-top: 2px;
    li{
      padding: 5px 10px;
      cursor: pointer;
      &:hover{
        color: #007fff;
      }
    }
  }
</style>
