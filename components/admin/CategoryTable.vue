<template>
  <el-table
    :data="cateData"
    stripe
    highlight-current-row
    @current-change="handleCurrentChange"
    :default-sort = "{prop: 'meta.updated', order: 'descending'}"
    style="width: 100%">
    <el-table-column
      label="文章标题"
      align="center"
      prop="title">
    </el-table-column>
    <el-table-column
      label="作者"
      width="120"
      align="center"
      prop="author">
    </el-table-column>
    <el-table-column
      label="分类"
      align="center"
      width="120"
      prop="meta.category">
    </el-table-column>
    <el-table-column
      label="标签"
      align="center"
      inline-template>
      <span>{{row.meta.tags.join('，')}}</span>
    </el-table-column>
    <el-table-column
      label="公开"
      align="center"
      width="80"
      prop="authority">
    </el-table-column>
    <el-table-column
      label="状态"
      align="center"
      width="80"
      prop="state">
    </el-table-column>
    <el-table-column
      label="更新时间"
      align="center"
      width="180"
      sortable
      prop="meta.updated">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="120"
      fixed="right"
      inline-template>
      <template>
        <el-button type="text" size="small" @click="editArtical(row)">编辑</el-button>
        <el-button type="text" size="small" @click="removeArtical(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['cateData'],
  methods: {
    editArtical (artical) {
      this.$router.push({
        path: `/admin/archives/edit/${artical.articalid}`
      })
    },
    async removeArtical (artical) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let returnInfo = await this.$http.post('/exapi/archives/removeArtical', {
          articalid: artical.articalid
        })
        if (returnInfo.data.status === 1) {
          this.$message({
            type: 'success',
            message: returnInfo.data.message
          })
          this.$emit('updateCateData')
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
    handleCurrentChange (currentRow, oldCurrentRow) {
      console.log(currentRow)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  max-height: 80vh;
}
</style>
