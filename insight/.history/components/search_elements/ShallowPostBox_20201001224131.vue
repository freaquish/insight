<template>
  <div
    @click="$router.push(`/post/${post.post_id}`)"
    class="relative w-full h-32"
  >
    <div class="w-full h-full absolute z-0" v-html="html"></div>
    <div class="w-full h-full absolute z-10 flex flex-col-reverse">
      <div class="w-full h-auto px-1 pb-1 flex">
        <img :src="getAvatar" class="w-8 h-8 rounded-md" />
        <p class="font-muli ml-2 text-xs mt-1 truncate text-white">
          {{ post.meta.username }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ShallowPost } from '@/types/index'
import { songPoster, avatarDefault } from '@/static/js/assets'

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
  },
  computed: {
    getAvatar(): string {
      return this.post.meta.avatar != undefined &&
        this.post.meta.avatar.length > 1
        ? this.post.meta.avatar
        : avatarDefault
    }
  }
})
</script>

<style scoped></style>
