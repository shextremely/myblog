<template>
  <div>
    <top-header></top-header>
    <section class="m-detail">
      <nuxt/>
    </section>
    <copy-right></copy-right>
  </div>
</template>

<script>
import TopHeader from '~/components/Header.vue'
import CopyRight from '~/components/CopyRight.vue'

export default {
  components: {
    TopHeader, CopyRight
  }
}
</script>

<style>
.m-detail{
  width: 60%;
  margin: 0 auto;
}
</style>
