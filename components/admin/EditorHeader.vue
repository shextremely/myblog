<template>
<header class="editor-header">
  <el-row :gutter="20">
    <el-col :span="17">
      <div class="left-box">
        <input class="title" v-model="artical.title" placeholder="输入文章标题..."></input>
      </div>
    </el-col>
    <!--TODO 第一次点击写文章时需要跳转至guide/markdown页面知道用户的markdown使用 -->
    <el-col :span="7">
      <div class="right-box">
        <div class="auto-save" v-text="autoSaveText"></div>
        <div class="artical-cover">
          <el-popover ref="coverpopover" placement="bottom" width="300" trigger="click">
            <div class="cover">
              <p class="title">添加封面大图</p>
              <div class="upload-cover" :style="{'display': !uploadedCover ? 'block' : 'none'}" v-text="uploadText"
                @click="addCoverImage"></div>
              <div class="preview-cover" :style="{'display': uploadedCover ? 'block' : 'none'}">
                <img :src="coversrc" alt="封面大图">
                <div class="delete" @click="deleteCoverImage">
                  <i class="el-icon-fa-trash el-icon-fa-large"></i>
                </div>
              </div>
              <input type="file" class="image-file-selector"
                style="display:none;"
                ref="coverupload"
                name="image"
                accept="image/*"
                @change="selectCoverImage">
            </div>
          </el-popover>
          <div class="toggle" v-popover:coverpopover>
            <i class="icon el-icon-fa-image"></i>
          </div>
        </div>
        <div class="artical-publish">
          <el-popover ref="publishpopover" placement="bottom" width="300" trigger="click">
            <div class="publish">
              <p class="title">发布文章</p>
              <div class="categories">
                <p class="subtitle">选择分类</p>
                <ul class="list selectable">
                  <li v-for="(item, index) in categories" :key="index" :class="{active: categoryActive === index}" @click="selectCategory(index)">
                    {{item}}
                  </li>
                </ul>
              </div>
              <div class="tags">
                <p class="subtitle">标签</p>
                <ul class="list">
                  <li v-for="(item, index) in artical.meta.tags" :key="index" @click="removeArticalTag(item)">
                    {{item}}
                  </li>
                </ul>
                <div class="tag-input">
                  <input type="text" placeholder="搜索标签（可选填）" @keyup.enter="filterArticalTags" @keyup.esc="clearArticalTags">
                  <keep-alive>
                    <AlternativeTags v-if="alternativeTags.length" :alternativeTags="alternativeTags" @selectedTag="addArticalTags"></AlternativeTags>
                  </keep-alive>
                </div>
              </div>
              <div class="abstract">
                <p class="subtitle">摘要</p>
                <textarea placeholder="请输入摘要内容" v-model="artical.abstract"></textarea>
              </div>
              <template>
                <el-radio v-model="artical.authority" label="公开">公开</el-radio>
                <el-radio v-model="artical.authority" label="私密">私密</el-radio>
              </template>
              <div class="submit">
                <el-button :plain="true" type="info" @click="publicArtical">确认并发布</el-button>
              </div>
            </div>
          </el-popover>
          <el-button type="text" v-popover:publishpopover>发布</el-button>
          <el-button type="text" @click="saveDraft">保存</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</header>
</template>

<script>
import AlternativeTags from '~/components/admin/AlternativeTags.vue'
import dateFormat from 'dateformat'

export default {
  props: ['writeValue', 'isEdit'],
  components: {
    AlternativeTags
  },
  data () {
    return {
      articalid: '',
      autoSaveText: '文章将会自动保存',
      coversrc: null,
      uploadedCover: false,
      uploadText: '点击此处添加图片',
      categories: ['Javascript', 'NodeJS', 'CSS', '框架和库', '前端优化', '网络安全'],
      categoryActive: 0,
      alternativeTags: [],
      artical: {
        title: '',
        imageUrl: '',
        content: '',
        abstract: '',
        authority: '',
        state: '',
        meta: {
          category: 'Javascript',
          tags: [],
          created: null,
          updated: null
        }
      }
    }
  },
  computed: {
    coverImageDom () {
      return this.$refs.coverupload
    }
  },
  mounted () {
    if (this.isEdit === 'true') {
      let articalid = this.$route.params.articalid
      this.articalid = articalid
      this.setCurrArtical(articalid)
    }
  },
  methods: {
    addCoverImage () {
      if (this.coverImageDom) {
        return this.coverImageDom.click()
      }
    },
    deleteCoverImage () {
      this.coversrc = null
      this.coverImageDom.valule = ''
      this.uploadedCover = false
      this.uploadText = '点击此处添加图片'
    },
    async selectCoverImage (e) {
      this.uploadText = '图片正在加载'
      let file = e.target.files[0]
      let formData = new FormData()
      formData.append('image', file)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let returnDoc = await this.$http.post('/exapi/upload/image', formData, config)
      let imgData = returnDoc.data
      if (imgData.status === 1) {
        imgData = imgData.data
        this.uploadedCover = true
        this.coversrc = `http://localhost:3000/upload/images/${imgData.filename}`
      }
    },
    async setCurrArtical (articalid) {
      let currartical = await this.$http.get(`/exapi/artical/showArticalInfoById/${articalid}`)
      currartical = currartical.data.data
      if (currartical) {
        this.artical.title = currartical.title
        if (currartical.imageUrl) {
          this.uploadedCover = true
          this.coversrc = currartical.imageUrl
        }
        this.categoryActive = this.categories.findIndex(item => item === currartical.meta.category)
        this.artical.abstract = currartical.abstract
        this.artical.authority = currartical.authority
        this.artical.meta.tags = currartical.meta.tags
      }
    },
    publicArtical () {
      this.artical.state = '已发布'
      console.log(this.artical)
      if (this.isEdit === 'true') {
        this.updateArtical()
      } else {
        this.createArtical()
      }
    },
    saveDraft () {
      this.artical.authority = '私密'
      this.artical.state = '草稿'
      if (this.isEdit === 'true') {
        this.updateArtical('draft')
      } else {
        this.createArtical('draft')
      }
    },
    createArtical (type) {
      let currentDate = dateFormat(new Date(), 'yyyy-mm-dd HH:MM')
      this.artical.meta.created = currentDate
      this.artical.meta.updated = currentDate
      this.artical.imageUrl = this.coversrc
      this.artical.content = this.writeValue
      console.log(this.artical)
      // 写到这里，发表接口
      if (type !== 'draft') {
        if (!(this.artical.title && this.artical.content && this.artical.meta.category)) {
          this.$message({
            message: '文章信息不全，请重新填写',
            type: 'error',
            duration: 1000
          })
          return
        }
      }
      this.$http.post('/exapi/archives/addArtical', {
        artical: this.artical
      }).then(response => {
        let resData = response.data
        if (resData.status === 1) {
          this.$message({
            message: resData.message,
            type: 'success',
            duration: 1000
          })
          this.$router.push({
            path: '/admin/archives/manage'
          })
        } else if (resData.status === 0) {
          this.$message({
            message: resData.message,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(error => {
        if (error) {
          console.log(error.stack)
        }
      })
    },
    updateArtical () {
      let currentDate = dateFormat(new Date(), 'yyyy-mm-dd HH:MM')
      this.artical.meta.updated = currentDate
      this.artical.imageUrl = this.coversrc
      this.artical.content = this.writeValue
      // 写到这里，发表接口
      if (!(this.artical.title && this.artical.content && this.artical.meta.category)) {
        this.$message({
          message: '文章信息不全，请重新填写',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.$http.post('/exapi/archives/updateArtical', {
        articalid: this.articalid,
        artical: this.artical
      }).then(response => {
        let resData = response.data
        console.log(resData)
        if (resData.status === 1) {
          this.$message({
            message: resData.message,
            type: 'success',
            duration: 1000
          })
          this.$router.push({
            path: '/admin/archives/manage'
          })
        } else if (resData.status === 0) {
          this.$message({
            message: resData.message,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(error => {
        if (error) {
          console.log(error.stack)
        }
      })
    },
    selectCategory (index) {
      this.categoryActive = index
      this.artical.meta.category = this.categories[index]
    },
    async filterArticalTags (ev) {
      let tags = await this.$http.get(`/exapi/tags/showAllTags`)
      tags = tags.data.data.map(item => item.name)
      console.log(tags)
      this.alternativeTags = this.likeQuery(tags, ev.target.value)
    },
    clearArticalTags () {
      this.alternativeTags = []
    },
    addArticalTags (tagName) {
      if (!this.artical.meta.tags.includes(tagName)) {
        this.artical.meta.tags.push(tagName)
        this.alternativeTags = []
      }
    },
    removeArticalTag (item) {
      this.artical.meta.tags.splice(this.artical.meta.tags.findIndex((value) => {
        return value === item
      }), 1)
    },
    likeQuery: (lists, keyWord) => {
      return lists.filter((item) => {
        return item.includes(keyWord)
      })
    },
    returnHome () {
      setTimeout(() => {
        this.$router.push({path: '/timeline'})
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 10%;
$border: 1px solid #d4d4d4;
$popover-padding: 10px;
$popover-color: #909090;
$placeholder-color: #ddd;
.editor-header{
  height: $header-height;
  background-color: #fff;
  color: #000;
  border: $border;
  box-sizing: inherit;
  .el-row{
    margin: 0;
  }
  .el-row, .el-col, .left-box, .right-box{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .left-box{
    .title {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 20px;
      font-size: 28px;
      font-weight: bold;
      outline: none;
    }
  }
  .right-box{
    font-size: 14px;
    & > div{
      padding: 0 20px;
      &:first-child {
        padding-left: 0;
        color: #ddd;
        cursor: default;
        user-select:none;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
.artical-cover, .artical-publish {
  height: 35px;
  line-height: 35px;
}
.artical-cover{
  .icon{
    color: #ccc;
    cursor: pointer;
    &:before{
      font-size: 20px;
    }
    &:hover{
      color: #ddd;
    }
  }
}
.cover, .publish{
  padding: $popover-padding;
  color: $popover-color;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: hsla(218,9%,51%,.8);
    margin-top: 0;
    margin-bottom: 10px;
  }
  .subtitle{
    font-size: 16px;
    margin-bottom: 8px;
  }
}
.upload-cover, .preview-cover{
  width: 100%;
  height: 130px;
}
.upload-cover{
  line-height: 130px;
  font-size: 18px;
  background: rgba(225,225,225,0.6);
  text-align: center;
  cursor: pointer;
  &:hover{
    background: rgba(225,225,225,0.8);
  }
}
.preview-cover{
  position: relative;
  .delete{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    i{
      &:before{
        font-size: 18px;
      }
    }
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.publish{
  .list{
    padding-left: 0;
    list-style: none;
    li{
      display: inline-block;
      padding: 3px 5px;
      margin: 0 6px 10px 0;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      cursor: pointer;
      &.active, &:hover{
        color: #007fff;
        border-color: rgba(0,127,255,.15);
        background-color: rgba(0,127,255,.05);
      }
    }
  }
  .el-button{
    display: block;
    margin: 10px auto;
  }
  textarea{
    width: 100%;
    height: 60px;
    outline: none;
  }
  input{
    width: 100%;
    border: none;
    border-bottom: $border;
    &::placeholder{
      color: $placeholder-color;
    }
  }
}
.abstract{
  margin-bottom: 10px;
}
.tag-input{
  position: relative;
  input{
    outline: none;
  }
  .suggested-tag-list{
    position: absolute;
  }
}
</style>
