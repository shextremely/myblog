<template>
  <div>
    <top-header></top-header>
    <banner></banner>
    <section class="m-layout">
      <nuxt/>
    </section>
    <copy-right></copy-right>
  </div>
</template>

<script>
import TopHeader from '~/components/Header.vue'
import Banner from '~/components/Banner.vue'
import CopyRight from '~/components/CopyRight.vue'

export default {
  components: {
    TopHeader, Banner, CopyRight
  }
}
</script>

<style>
.m-layout{
  width: 80%;
  margin: 0 auto;
}
</style>
