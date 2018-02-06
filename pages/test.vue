<template>
<main class="m-wrap">
  <form action="/exapi/upload/image" enctype="multipart/form-data" method="POST">
    <input type="file" class="image-file-selector" name="image"
      accept="image/*">
    <input type="submit" value="上传">
  </form>
</main>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style lang="scss" scoped>
</style>
