<template>
<div class="m-filter">
  <el-form ref="filterForm" :model="filterForm" label-width="80px">
    <el-form-item label="标签">
      <div class="form-list">
        <div class="form-item" :class="{active: tagsActiveIndex === -1}" @click="transActive('tags', -1)">全部</div>
        <ul class="tagsList">
          <li v-for="item,index in tagsList" :key="item.tagid" class="form-item" :class="{active: tagsActiveIndex === index}" @click="transActive('tags', index)">{{item.name}}</li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item label="分类">
      <div class="form-list">
        <div class="form-item" :class="{active: categoriesActiveIndex === -1}" @click="transActive('categories', -1)">全部</div>
        <ul class="categoriesList">
          <li v-for="item,index in categoriesList" :key="item.index" class="form-item" :class="{active: categoriesActiveIndex === index}" @click="transActive('categories', index)">{{item.name}}</li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item label="公开">
      <div class="form-list">
        <div class="form-item" :class="{active: authoritiesActiveIndex === -1}" @click="transActive('authorities', -1)">全部</div>
        <ul class="authoritiesList">
          <li v-for="item,index in authoritiesList" :key="index" class="form-item" :class="{active: authoritiesActiveIndex === index}" @click="transActive('authorities', index)">{{item}}</li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item label="状态">
      <div class="form-list">
        <div class="form-item" :class="{active: stateActiveIndex === -1}" @click="transActive('state', -1)">全部</div>
        <ul class="statesList">
          <li v-for="item,index in stateList" :key="index" class="form-item" :class="{active: stateActiveIndex === index}" @click="transActive('state', index)">{{item}}</li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchArticals" size="small">搜索</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['tagsList', 'categoriesList', 'authoritiesList', 'stateList', 'defaultCondition'],
  data () {
    return {
      filterForm: {},
      tagsActiveIndex: -1,
      categoriesActiveIndex: -1,
      authoritiesActiveIndex: -1,
      stateActiveIndex: -1
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      let currCate = this.categories.find(item => item.index === key)
      this.$emit('tagChange', currCate.name)
    },
    transActive (type, activeIndex) {
      this[`${type}ActiveIndex`] = activeIndex
    },
    searchArticals () {
      let currTag = this.tagsList.find((value, index) => this.tagsActiveIndex === index)
      let currCate = this.categoriesList.find((value, index) => this.categoriesActiveIndex === index)
      let currAuth = this.authoritiesList.find((value, index) => this.authoritiesActiveIndex === index)
      let currState = this.stateList.find((value, index) => this.stateActiveIndex === index)
      let condition = {}
      if (currTag) condition.tag = currTag.name
      if (currCate) condition.category = currCate.name
      if (currAuth) condition.authority = currAuth
      if (currState) condition.state = currState
      this.$emit('conditionChange', Object.assign({}, this.defaultCondition, condition))
    }
  }
}
</script>

<style lang="scss" scoped>
.m-filter{
  display: flex;
  justify-content: left;
  padding-top: 10px;
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-form-item ul{
    display: flex;
    padding-left: 0;
  }
  .form-list {
    display: flex;
  }
  .form-item {
    padding: 11px 12px;
    line-height: 1;
    border-radius: 5px;
    cursor: pointer;
    &.active {
      color: #fff;
      background: #324157;
    }
  }
}
</style>
