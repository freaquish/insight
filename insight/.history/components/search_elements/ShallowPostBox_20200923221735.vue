<template>
  <div class="relative">
    <div class="w-full h-full absolute z-0"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ShallowPost } from '@/types/index'
import { songPoster } from '@/static/js/assets'

export default Vue.extend({
  props: {
    post: {} as PropOptions<ShallowPost>
  },
  data() {
    return {
      html: '' as string
    }
  },
  mounted() {
    if (
      this.post.assets.images != undefined &&
      this.post.assets.images.length > 0
    ) {
      this.html = `<img src="${this.post.assets.images[0]}" class="w-full h-full"/>`
    } else if (
      this.post.assets.video != undefined ||
      this.post.assets.audio != undefined
    ) {
      this.html = `<img src="${songPoster} class="w-full h-full"`
    } else if (this.post.assets.text != undefined) {
      let text = this.post.assets.text
      this.html = `<div style="background-color:${text.bgColor};font-family:${text.fontName};color:${text.fontColor}>${text.data}</div>`
    }
  }
})
</script>

<style scoped></style>
