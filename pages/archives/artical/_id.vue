<template>
<!-- 文章容器 -->
<div class="container">
  <!-- 文章展示图片 -->
  <div class="artical-image">
    <img :src="articalData.imageUrl" :alt="articalData.title">
  </div>
  <!-- 文章内容 -->
  <div class="artical-content">
    <!-- 文章标题 -->
    <h1 class="title" v-text="articalData.title"></h1>
    <div class="artical-meta">
      <div class="meta-item">阅读 <span>425</span></div>
      <div class="meta-item">收藏 <span>7</span></div>
      <div class="meta-item" v-text="articalData.meta.updated"></div>
      <!-- 文章元数据 -->
    </div>
    <!-- 文章MarkDown文本 -->
    <div class="marked-content" v-html="markedContent" v-highlight></div>
  </div>
</div>
</template>

<script>
import * as axios from 'axios'
import marked from 'marked'
export default {
  layout: 'detail',
  computed: {
    markedContent () {
      return marked(this.articalData.content)
    }
  },
  async asyncData ({isServer, params, app}) {
    console.log('params: ' + params.id)
    let articalData = await axios.get('/exapi/artical/showArticalInfoById/' + params.id)
    console.log(articalData.data.data)
    return {
      articalData: articalData.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.artical-image {
  img{
    width: 100%;
    height: 240px;
  }
}
.artical-content {
    padding: 10px 20px;
    .title {
        font-size: 24px;
        color: #000;
    }
}
.artical-meta {
    display: flex;
    align-items: item;
    font-size: 12px;
    .meta-item {
        &:not(:last-child) {
            margin-right: 5px;
        }
    }
}
.marked-content {
    font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    color: #24292e;
    word-wrap: break-word;
    line-height: 1.5rem;
}
</style>
