<template>
  <div class="m-banner" id='particles'>
    <span>前端知识总结</span>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  require('particles.js')
}
export default {
  mounted () {
    window.particlesJS.load('particles', 'particles.json')
  }
}
</script>

<style lang="scss" scoped>
$banner-bgcolor: #85acff;
.m-banner{
  position: relative;
  display: flex;
  height: 200px;
  font-size: 16px;
  color: #fff;
  background: $banner-bgcolor;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  span{
    position: absolute;
  }
}
</style>
