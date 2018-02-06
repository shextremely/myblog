<template>
<main class="m-wrap">
  <div class="content">
    <div class="countdown">
      <span>145</span>
      <span>&nbsp;&nbsp;DAYS</span>
    </div>
    <p class="oath">WE ARE WORKING HARD FOR BETTER EXPIRIENCE</p>
  </div>
  <div class="header">
    <div class="logo">FRONTEND</div>
    <ul class="categories">
      <li class="active">
        <nuxt-link to="/">HOME</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/archives">CATEGORIES</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/columns">COLUMNS</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">ABOUT</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">CONTACT</nuxt-link>
      </li>
    </ul>
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
  <div class="footer"></div>
</main>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style lang="scss" scoped>
$color: #353535;
$hover: #e84d49;
.m-wrap {
    height: 100vh;
    color: $color;
    background: #ebebeb;
    font-family: 'Roboto', sans-serif;
    ul {
        li {
            padding: 0 15px;
            cursor: pointer;
            &.active,
            &:hover {
                color: $hover;
            }
            &:first-of-type {
                padding-left: 0;
            }
            &:last-of-type {
                padding-right: 0;
            }
        }
    }
    .content {
        height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    .categories,
    .contact-me,
    .header {
        display: flex;
        align-items: center;
    }
    .header {
        justify-content: space-around;
        height: 60px;
        margin-top: 5vh;
        background: rgba(255, 255, 255, 0.6);
    }
}
</style>
