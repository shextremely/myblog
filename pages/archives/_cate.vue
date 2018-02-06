<template>
<el-row :gutter="20">
  <el-col :span="17">
    <div class="g-left">
      <swiper :swiperData="swiperData"></swiper>
      <list :postData="postData"></list>
    </div>
    <!-- <div class="g-left" v-else>
      <div class="end-artical">无更多文章</div>
    </div> -->
  </el-col>
  <el-col :span="7">
    <div class="g-right">
      <search-bar></search-bar>
      <!-- 博文分类 -->
      <category-menu :categoriesList="categoriesList" :activeIndex="categoriesActiveIndex"></category-menu>
      <hotted></hotted>
      <!-- <tags></tags> -->
    </div>
  </el-col>
</el-row>
</template>

<script>
import * as axios from 'axios'

import Swiper from '~/components/home/Swiper.vue'
import List from '~/components/home/List.vue'
import Hotted from '~/components/home/Hotted.vue'
import CategoryMenu from '~/components/home/CategoryMenu.vue'
import SearchBar from '~/components/home/SearchBar.vue'
export default {
  layout: 'timeline',
  components: {
    Swiper,
    List,
    Hotted,
    CategoryMenu,
    SearchBar
  },
  data () {
    return {
      categoriesList: [{
        index: '1',
        name: 'Javascript'
      }, {
        index: '2',
        name: 'NodeJS'
      }, {
        index: '3',
        name: 'CSS'
      }, {
        index: '4',
        name: '框架和库'
      }, {
        index: '5',
        name: '前端优化'
      }, {
        index: '6',
        name: '网络安全'
      }]
    }
  },
  async asyncData ({params}) {
    let cate = params.cate ? params.cate : encodeURI('Javascript')
    let resData = await axios.get(`/exapi/archives/showArticalsList/${cate}`)
    return {
      postData: resData.data.data
    }
  },
  computed: {
    swiperData () {
      return this.postData.sort((a, b) => {
        return +new Date(b.meta.updated) - +new Date(a.meta.updated)
      }).slice(0, 6)
    },
    categoriesActiveIndex () {
      let cate = this.$route.params.cate || 'Javascript'
      return +this.categoriesList.find(item => item.name === cate).index
    }
  },
  mounted () {
    console.log()
  }
}
</script>

<style lang="scss">
.g-left{
  .end-artical {
    padding: 15px;
    text-align: center;
    color: #24292e;
  }
}
</style>
