<template>
  <div class="artical-wrap" @click="gotoDetailPage(articalInfo.articalid)">
    <div class="title">
      <figure>
        <img :src="articalInfo.imageUrl" width="60" height="60">
      </figure>
      <div>
        <p class="artical-title" v-text="articalInfo.title">王先森，生日快乐</p>
        <ul class="meta-wrap">
          <li>
            <ul class="meta-info">
              <li class="username">
                <i class="el-icon-fa-telegram"></i>
                <span v-text="articalInfo.author">shextremely</span>
              </li>
              <li class="updated">
                <i class="el-icon-fa-clock-o"></i>
                <span v-text="articalInfo.meta.updated">2017-10-15 20:08:15</span>
              </li>
            </ul>
          </li>
          <li>
            <ul class="follow-info">
              <li class="comment">
                <i class="el-icon-fa-comment-o"></i>
                <span>{{articalInfo.follow.comments}} Comments</span>
              </li>
              <li class="view">
                <i class="el-icon-fa-eye"></i>
                <span>{{articalInfo.follow.views}} Views</span>
              </li>
              <li class="favoriate">
                <i class="el-icon-fa-thumbs-up"></i>
                <span>{{articalInfo.follow.thumbsups}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <p class="abstract" v-html="articalInfo.abstract"></p>
  </div>
</template>

<script>
export default {
  props: ['articalInfo'],
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
$figure-width: 160px;
$artical-height: 130px;
$meta-hover: #409eff;
.artical-wrap{
  display: block;
  height: $artical-height;
  padding: 5px 10px 30px;
  // border-bottom: 1px solid #000;
  font: 12px/1.5 'Microsoft Yahei', 'Simsun';
  cursor: pointer;
  &:hover {
    background: rgba(200, 200, 200, 0.2);
  }
  ul{
    list-style: none;
    padding: 0;
  }
  &:not(:nth-of-type(1)){
    padding-top: 20px;
  }
  .title{
    display: flex;
    height: 60px;
    figure, p, ul{
      margin: 0;
    }
    figure {
      width: 10%;
    }
    div{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 90%;
    }
    p {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .abstract{
    color: #777;
  }
  .meta-wrap, .meta-info, .follow-info{
    display: flex;
  }
  .meta-wrap{
    justify-content: space-between;
    color: #999;
  }
  .meta-info, .follow-info{
    justify-content: space-around;
    li{
      padding: 0 8px;
      i{
        margin-right: 5px;
      }
      &:first-child{
        padding-left: 0;
      }
      &:last-child{
        padding-right: 0;
      }
    }
  }
  .artical-title, .username, .updated, .comment, .view, .favoriate{
    &:hover{
      color: $meta-hover;
    }
  }
}
</style>
