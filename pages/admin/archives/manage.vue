<template>
<div class='m-manage'>
  <filter-region :tagsList="tagsList"
    :categoriesList="categoriesList"
    :authoritiesList="authoritiesList"
    :stateList="stateList"
    :defaultCondition="defaultCondition"
    @conditionChange='updateDataByConditionName'></filter-region>
  <category-table :cateData='cateData' @updateCateData="updateCateData"></category-table>
</div>
</template>

<script>
import * as axios from 'axios'
import CategoryTable from '~/components/admin/CategoryTable.vue'
import FilterRegion from '~/components/admin/FilterRegion.vue'

export default {
  layout: 'admin',
  components: {
    FilterRegion,
    CategoryTable
  },
  data () {
    return {
      cateData: [],
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
      }],
      authoritiesList: ['公开', '私密'],
      stateList: ['已发布', '草稿'],
      defaultCondition: {
        tag: 'all',
        category: 'all',
        authority: 'all',
        state: 'all'
      },
      lastCondition: null
    }
  },
  async asyncData () {
    let tagsList = await axios.get(`/exapi/tags/showAllTags`)
    return {
      tagsList: tagsList.data.data
    }
  },
  created () {
    this.updateDataByConditionName(this.defaultCondition)
  },
  methods: {
    async updateDataByConditionName (condition) {
      this.lastCondition = condition
      let tableData = await this.$http.post(`/exapi/archives/showArticalsList`, condition)
      this.cateData = tableData.data.data
    },
    updateCateData () {
      if (this.lastCondition) {
        this.updateDataByConditionName(this.lastCondition)
      } else {
        this.updateDataByConditionName(this.defaultCondition)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.m-manage {
    }
</style>
