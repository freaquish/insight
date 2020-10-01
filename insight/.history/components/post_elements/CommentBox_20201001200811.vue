<template>
  <div class="w-full flex flex-col h-auto py-2 px-2">
    <div class="h-12 flex">
      <img :src="comment.account.avatar" class="w-10 h-10 rounded-full" />
      <p class="ml-4 inline-block m-auto font-lato font-bold">
        {{ comment.account.name }}
      </p>
    </div>
    <div class="h-auto mt-2 pl-12">
      <p class="font-muli break-words">{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Comment } from '@/types/index'

export default Vue.extend({
  props: {
    comment: {} as PropOptions<Comment>
  }
})
</script>

<style scoped></style>
