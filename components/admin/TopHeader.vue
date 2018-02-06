<template>
<div class="m-header" @click="cancelUserMethod()">
  <div class="logo">
    <span v-if="!notCollapse">FRONTEND</span>
  </div>
  <ul class="m-user">
    <li v-for="item,index in userHeader" :key="index" :class="{active: userActive === index}" @click.stop="userMethod(item.key, index)">
      <i :class="item.icon"></i>
      <span v-if="item.name">{{item.name}}</span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['notCollapse'],
  data () {
    return {
      userHeader: [{
        key: 'message',
        icon: 'el-icon-fa-envelope',
        name: ''
      }, {
        key: 'help',
        icon: 'el-icon-fa-question-circle',
        name: ''
      }, {
        key: 'username',
        icon: 'el-icon-fa-user',
        name: 'admin'
      }],
      userActive: -1
    }
  },
  methods: {
    userMethod (key, index) {
      this.userActive = index
    },
    cancelUserMethod () {
      this.userActive = -1
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 8vh;
.m-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $header-height;
    background: #fff;
    .logo{
      padding-left: 20px;
      font-weight: bold;
    }
    .m-user {
        display: flex;
        height: 100%;
        line-height: $header-height;
        li {
            padding: 0 10px;
            height: 100%;
            cursor: pointer;
            span{
              margin-left: 5px;
            }
            &:last-of-type {
                margin-right: 20px;
            }
            &:hover{
              color: #fff;
              background: #39435C;
            }
            &.active{
              color: #fff;
              background: #39435C;
            }
        }
    }
}
</style>
