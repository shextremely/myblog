<template>
<div class="m-menu" :class="{hasCollapse: !notCollapse}">
  <p class="logo">
    <span v-if="notCollapse"></span>
    <span v-if="notCollapse">FRONTEND</span>
    <i class="convert el-icon-fa-bars"></i>
  </p>
  <div class="user-panel">
    <img class="image" src="~assets/images/user.jpg" alt="用户">
    <div class="info" v-if="notCollapse">
      <p>Hello admin</p>
      <div>online</div>
    </div>
  </div>
  <el-menu :default-active="activeIndex" theme="dark" @select="handleSelect" class="el-menu-vertical-demo">
    <el-menu-item v-for="item in routers" :key="item.index" v-if="!item.childrens" :index="item.index">
      <i :class="item.icon" :title="item.name"></i><span v-if="notCollapse">{{item.name}}</span>
    </el-menu-item>
    <el-submenu :index="item.index" :key="item.index" v-else>
      <template slot="title">
        <i :class="item.icon" :title="item.name"></i><span v-if="notCollapse">{{item.name}}</span>
      </template>
      <el-menu-item v-for="childItem in item.childrens" :key="childItem.index" :index="childItem.index">
        <i :class="childItem.icon" :title="childItem.name"></i><span v-if="notCollapse">{{childItem.name}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
export default {
  props: ['notCollapse', 'routers', 'activeIndex'],
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // 首先返回router对象
      // TODO 如何判断是否登录状态，是否需要~
      this.$emit('convertActiveIndex', key)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #324157;
$logo-bg-color: #283744;
.m-menu {
    height: 100vh;
    color: #fff;
    background: $bg-color;
    flex-basis: 15%;
    &.hasCollapse{
      flex-basis: 5%;
    }
    &~.g-left {
      &.hasCollapse{
        flex-basis: 95%;
      }
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 50px;
        margin: 0;
        background-color: $logo-bg-color;
        .convert {
          cursor: pointer;
        }
    }
    .user-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        height: 56px;
        .image {
            width: 35px;
            height: 35px;
            margin: 0 10px;
            border-radius: 50%;
        }
        .info {
            padding-left: 5px;
            font-family: 'Lato', sans-serif;
            p {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
    .el-menu-item, .el-submenu__title{
      height: 50px;
      line-height: 50px;
    }
}
</style>
