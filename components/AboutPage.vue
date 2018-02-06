<template>
  <div class="m-about">
    <div class="about-page">
      <ul class="contact-me">
        <li class="item">
          <nuxt-link to="/"><i class="el-icon-fa-weibo"></i></nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/"><i class="el-icon-fa-wechat"></i></nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/"><i class="el-icon-fa-github"></i></nuxt-link>
        </li>
      </ul>
    </div>
    <!-- TODO 从这里进入后台
    <div class="write">
      <i class="el-icon-fa-weibo"></i>
    </div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$aboutHeight: 100px;
.m-about {
  background: #ebebeb;
  // &:hover{
  //   .write {
  //     height: 60px;
  //   }
  // }
  .about-page{
    height: 30px;
    width: 80%;
    margin: 0 auto;
  }
  // .write{
  //   position: relative;
  //   height: 0px;
  //   transition: height 1s;
  // }
  .contact-me{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    li{
      width: 30px;
    }
  }
}
</style>
