<template>
  <div class="m-search">
    <el-input class="" placeholder="在本站中搜索"></el-input>
    <el-button type="primary"><img src="~assets/images/search.png"></el-button>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.m-search{
  display: flex;
  .el-button{
    margin-left: 10px;
    padding: 0 15px;
    img{
      width: 20px;
      height: 20px;
    }
  }
}
</style>
