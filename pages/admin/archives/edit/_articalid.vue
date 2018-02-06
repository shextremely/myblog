<template>
  <div class="m-editor">
    <EditorHeader :writeValue="writeValue" isEdit='true'></EditorHeader>
    <editor :writeValue="writeValue" @updateWriteVaue="updateWriteVaue"></editor>
  </div>
</template>

<script>
import EditorHeader from '~/components/admin/EditorHeader.vue'
import Editor from '~/components/admin/Editor.vue'
export default {
  layout: 'admin',
  components: {
    EditorHeader, Editor
  },
  data () {
    return {
      writeValue: ''
    }
  },
  created () {
    let articalid = this.$route.params.articalid
    this.getArticalById(articalid)
  },
  methods: {
    async getArticalById (articalid) {
      let currartical = await this.$http.get(`/exapi/artical/showArticalInfoById/${articalid}`)
      currartical = currartical.data.data
      if (currartical) {
        this.writeValue = currartical.content
      }
    },
    updateWriteVaue (writeValue) {
      this.writeValue = writeValue
    }
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #d4d4d4;
$mainHeight: 90%;
$footer-color: #ccc;
$footer-hover-color: #ddd;
$popover-padding: 10px;
$popover-color: #909090;
.m-editor{
  height: 92vh;
  box-sizing: border-box;
}
.main{
  width: 100%;
  height: $mainHeight;
  background: 100%;
  color: #000;
  .el-row, .el-col{
    height: 100%;
  }
  .el-row{
    margin: 0!important;
  }
  .editor-box{
    position: relative;
    padding: 0!important;
    pre{
      display:block;
      visibility:hidden;
      margin: 0;
      max-height: 90%;
      span{
        display: block;
        width: auto;
        height: 100px;
      }
    }
  }
  .editor-textarea {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 20px 30px 0;
      font-size: 14px;
      color: #000;
      border: none;
      border-right: 1px solid #d4d4d4;
      background-color: #fff;
      box-sizing: inherit;
      outline: none;
      resize: none;
  }
  .editor-textarea, .preview-content {
    box-sizing: inherit;
    height: 92%;
  }
  .preview-box{
    position: relative;
    background-color: #fff;
  }
  .preview-content {
    overflow-y: auto;
    padding: 20px 30px 0;
  }
  .preview-info, .editor-footer{
    position: absolute;
    height: 8%;
    line-height: 40px;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: $footer-color;
    &:before{
      content: '';
      display: block;
      position: absolute;
      border-top: $border;
      width: 100%;
    }
  }
  .editor-footer{
    background-color: #fff;
    border-right: $border;
    box-sizing: inherit;
    .shortcut{
      display: flex;
      & > div {
        width: 40px;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: $footer-hover-color;
        }
      }
    }
    .hide{
      width: 40px;
      text-align: center;
      cursor: pointer;
      &:hover{
        color: $footer-hover-color;
      }
    }
  }
  .preview-info{
    left: -1px;
    font-size: 14px;
    & > div {
      padding: 0 10px;
    }
  }
}
.el-popover{
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
</style>
