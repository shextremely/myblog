<template>
  <div class="m-hotted">
    <nav>
      <ul class="cate">
        <li v-for="item,index in limit" :key="index" :class="{active: index === limitActive}" v-text="item" @click="transLimit(item, index)"></li>
      </ul>
    </nav>
    <ul class="hotted-list">
      <li class="item" v-for="item,index in articalsLst" :key="index" @click="gotoDetailPage(item.articalid)">
        <figure>
          <img :src="item.imageUrl" width="60" height="60">
        </figure>
        <div>
          <p class="title" v-text="item.title"></p>
          <p class="description">{{item.author}}&nbsp;&nbsp;{{item.meta.updated.split(' ')[0]}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      limit: ['Popular', 'Recent', 'Comments'],
      limitActive: 0,
      articalsLst: []
    }
  },
  mounted () {
    this.getArticalsList()
  },
  methods: {
    async getArticalsList (limit = 'Popular') {
      let list = await this.$http.get(`/exapi/archives/showArticalsList/all`, {
        params: {
          limit
        }
      })
      this.articalsLst = list.data.data
    },
    transLimit (limit, curLimit) {
      this.limitActive = curLimit
      this.getArticalsList(limit)
    },
    gotoDetailPage (articalid) {
      this.$router.push({
        path: `/archives/artical/${articalid}`
      })
    }
  }

}
</script>

<style lang="scss" scoped>
$nav-height: 40px;
.m-hotted{
  font: 12px/1.5 'Microsoft Yahei', 'Simsun';
  margin-top: 20px;
  nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $nav-height;
    font-size: 14px;
    a {
      padding: 10px 20px;
      text-decoration: none;
    }
  }
  .cate{
    display: flex;
    justify-content: space-around;
    width: 100%;
    li{
      cursor: pointer;
    }
    .active{
      color: #409eff;
    }
  }
  ul{
    list-style: none;
    padding-left: 0;
  }
}
.hotted-list{
  .item{
    display: flex;
    cursor: pointer;
    figure, p{
      margin: 0;
    }
    figure{
      margin-right: 10px;
    }
    .title{
      font-size: 14px;
      font-weight: bold;
      padding:5px 0;
    }
    .description{
      padding:5px 0;
    }
    &:not(:first-child){
      margin-top: 10px;
    }
  }
}
</style>
