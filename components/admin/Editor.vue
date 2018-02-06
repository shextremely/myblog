<template>
  <div class="m-editor">
    <el-row :gutter="20">
      <el-col :span="12" class="editor-box">
        <!-- <pre><span>{{writeValue}}</span><br></pre> -->
        <textarea class="editor-textarea"
          placeholder="请输入文字"
          ref="editorTextarea"
          v-html="writeValue"
          @keyup.self.prevent="registerEventList"
          @input="updatePreviewContent"></textarea>
        <div class="editor-footer">
          <div class="shortcut">
            <el-popover ref="keyboardpopover" placement="top-start" width="450" trigger="hover">
              <div class="keyboradpanel">
                <p class="title">快捷键</p>
                <el-table
                  :data="keyBoardData"
                  style="width: 100%">
                  <el-table-column
                    prop="md"
                    label="MarkDown">
                  </el-table-column>
                  <el-table-column
                    prop="res"
                    label="结果">
                  </el-table-column>
                  <el-table-column
                    prop="shortcut"
                    label="快捷键">
                  </el-table-column>
                </el-table>
              </div>
            </el-popover>
            <div class="keyboard" v-popover:keyboardpopover>
              <i class="el-icon-fa-keyboard-o"></i>
            </div>
            <div class="upload" @click="uploadImage">
              <i class="el-icon-fa-upload"></i>
            </div>
          </div>
          <div class="hide">
            <i class="el-icon-fa-step-forward"></i>
          </div>
          <input type="file" class="image-file-selector"
              style="display:none;"
              ref="imageupload"
              name="image"
              accept="image/*"
              @change="selectImage">
        </div>
      </el-col>
      <el-col :span="12" class="preview-box">
        <div class="preview-content" v-html="previewContent" v-highlight></div>
        <div class="preview-info">
          <div class="info-text">
            <span>预览</span>
          </div>
          <div class="info-text">
            <span>0字</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  props: ['writeValue'],
  data () {
    return {
      abstractValue: '',
      currWriteValue: this.writeValue,
      keyBoardData: [{
        md: '# 标题',
        res: 'H1',
        shortcut: ''
      }, {
        md: '## 标题',
        res: 'H2',
        shortcut: ''
      }, {
        md: '**文本**',
        res: '粗体',
        shortcut: 'Ctrl + B'
      }, {
        md: '[描述](http://)',
        res: '链接',
        shortcut: 'Ctrl + A'
      }, {
        md: '`code`',
        res: 'Inside Code',
        shortcut: 'Ctrl + Shift + K'
      }, {
        md: '```code```',
        res: 'Code',
        shortcut: 'Ctrl + C'
      }, {
        md: '![alt](http://)',
        res: '图片',
        shortcut: 'Ctrl + I'
      }, {
        md: '* item',
        res: '列表',
        shortcut: 'Ctrl + Shift + L'
      }]
    }
  },
  computed: {
    previewContent () {
      return marked(this.writeValue)
    },
    imgUploadDom () {
      return this.$refs.imageupload
    }
  },
  methods: {
    updatePreviewContent (event) {
      this.currWriteValue = event.target.value
      this.updateWriteVaue()
    },
    updateWriteVaue () {
      this.$emit('updateWriteVaue', this.currWriteValue)
    },
    supportTabKey (event) {
      // TODO 这里的功能如何实现，支持TAB缩进
    },
    /**
     * [uploadImage 图片上传]
     * @return {[type]} [description]
     */
    uploadImage () {
      if (this.imgUploadDom) {
        return this.imgUploadDom.click()
      }
    },
    /**
     * [clearImage file点击事件时触发，目的是为了选择同一张图片触发change事件]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    clearImage () {
      this.imgUploadDom.value = ''
    },
    /**
     * [selectImage input file change事件]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    async selectImage (e) {
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
        this.insertAtCursor(`![alt](http://localhost:3000/upload/images/${imgData.filename})`)
        this.updateWriteVaue()
      }
    },
    registerEventList (ev) {
      if (ev.keyCode === 66 && ev.ctrlKey) {
        console.log('粗体')
        this.insertAtCursor('**文本**')
      } else if (ev.keyCode === 67 && ev.ctrlKey) {
        console.log('CODE')
        this.insertAtCursor('```CODE```')
      } else if (ev.keyCode === 73 && ev.ctrlKey) {
        console.log('IMAGE')
        this.insertAtCursor('![alt](http://)')
      } else if (ev.keyCode === 65 && ev.ctrlKey && !ev.shiftKey) {
        console.log('链接')
        this.insertAtCursor('[描述](http://)')
      } else if (ev.keyCode === 75 && ev.ctrlKey && ev.shiftKey) {
        console.log('Inside Code')
        this.insertAtCursor('`code`')
      } else if (ev.keyCode === 76 && ev.ctrlKey && ev.shiftKey) {
        console.log('列表')
        this.insertAtCursor('* item')
      }
      this.updateWriteVaue()
    },
    insertAtCursor (value) {
      let field = this.$refs.editorTextarea
      if (field.selectionStart || field.selectionStart === '0') {
        let startPos = field.selectionStart
        let endPos = field.selectionEnd
        let beforeVal = field.value.substring(0, startPos)
        let afterVal = field.value.substring(endPos, field.value.length)

        field.value = beforeVal + value + afterVal
        field.selectionStart = startPos + value.length
        field.selectionEnd = startPos + value.length
        field.focus()
      } else {
        field.value += value
        field.focus()
      }
      this.currWriteValue = field.value
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
    padding: 0!important;
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
