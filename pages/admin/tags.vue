<template>
<div class="m-tags">
  <div class="tool-bar">
    <div class="control-bar">
      <el-button type="primary" size="small" round @click="addTag">增加标签</el-button>
      <el-button type="primary" icon="fa-edit" size="small" round :disabled="!editable" @click="modifyTag"></el-button>
      <el-button type="primary" icon="fa-trash" size="small" round :disabled="!deletable" @click="removeTags"></el-button>
    </div>
    <div class="search-bar">
      <el-input placeholder="请输入内容" v-model="searchItem" size="small">
      </el-input>
    </div>
  </div>

  <el-table ref="tagsTable" :data="tagsData" stripe max-height="500px;" :default-sort="{prop: 'created', order: 'descending'}" @row-click="handleCurrentChange" @selection-change="handleSelectionChange" style="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="名称" prop="name">
    </el-table-column>
    <el-table-column label="描述" prop="description">
    </el-table-column>
    <el-table-column label="创建时间" prop="created" sortable>
    </el-table-column>
    <el-table-column label="文章" prop="articalsNumber">
    </el-table-column>
  </el-table>
  <!-- TODO dialog 宽度 -->
  <el-dialog :title="dialog.name" :visible.sync="dialog.visible" width="20%" :before-close="handleClose">
    <el-form ref="addTagForm" :model="addTagForm" label-width="80px" :rules="tagFormRules">
      <el-form-item label="标签名称" prop="name">
        <el-input :value="addTagForm.name" v-model="addTagForm.name"></el-input>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input type="textarea" :value="addTagForm.desc" v-model="addTagForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible=false">取&nbsp;消</el-button>
      <el-button type="primary" @click="submitTagsForm" :disabled="dialog.confirmButtonLoading">{{dialog.confirmButtonText}}</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import dateFormat from 'dateformat'

export default {
  layout: 'admin',
  data () {
    return {
      editable: false,
      deletable: false,
      currentRow: null,
      searchItem: '',
      multipleSelection: [],
      tagsData: [],
      dialog: {
        name: '',
        isModify: false,
        visible: false,
        confirmButtonText: '确 定',
        confirmButtonLoading: false,
        curSelection: null
      },
      addTagForm: {
        name: '',
        desc: '',
        created: ''
      },
      tagFormRules: {
        name: [{
          required: true,
          message: '请输入标签名称',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.showTags()
  },
  methods: {
    addTag () {
      this.dialog.title = '创建标签'
      this.dialog.visible = true
      this.dialog.isModify = false
      this.dialog.curSelection = null
      this.addTagForm.name = ''
      this.addTagForm.desc = ''
    },
    modifyTag () {
      if (this.multipleSelection.length !== 1) {
        return
      }
      this.dialog.curSelection = this.multipleSelection[0]
      this.dialog.title = '修改标签'
      this.dialog.visible = true
      this.dialog.isModify = true
      this.addTagForm.name = this.dialog.curSelection.name
      this.addTagForm.desc = this.dialog.curSelection.description
    },
    async showTags () {
      let tagsData = await this.$http.get(`/exapi/tags/showAllTags`)
      this.tagsData = tagsData.data.data
    },
    async submitTagsForm () {
      let currentDate = dateFormat(new Date(), 'yyyy-mm-dd HH:MM')
      this.dialog.confirmButtonText = '执行中...'
      this.dialog.confirmButtonLoading = true
      this.addTagForm.created = currentDate
      let returnInfo = {}
      if (this.dialog.isModify) {
        returnInfo = await this.$http.post('/exapi/tags/modifyTag', {
          tagid: this.dialog.curSelection.tagid,
          tags: this.addTagForm
        })
      } else {
        returnInfo = await this.$http.post('/exapi/tags/addTag', {
          tags: this.addTagForm
        })
      }
      this.dialog.confirmButtonLoading = false
      this.dialog.confirmButtonText = '确 定'
      if (returnInfo.data.status === 1) {
        this.dialog.visible = false
        this.showTags()
      } else {
        this.dialog.visible = true
      }
      setTimeout(() => {
        this.$message({
          type: 'info',
          message: returnInfo.data.message
        })
      }, 300)
    },
    handleClose (done) {
      done()
    },
    removeTags () {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let removeTagsIDs = this.multipleSelection.map(item => item.tagid)
        let returnInfo = await this.$http.post('/exapi/tags/removeTags', {
          removeTagsIDs
        })
        if (returnInfo.data.status === 1) {
          this.$message({
            type: 'success',
            message: returnInfo.data.message
          })
          this.showTags()
        } else {
          this.$message.error(returnInfo.data.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (row) {
      this.$refs.tagsTable.toggleRowSelection(row)
    },
    handleSelectionChange (val) {
      this.editable = val.length === 1
      this.deletable = val.length > 0
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.m-tags {
  .tool-bar{
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
}
</style>
