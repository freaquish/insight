<template>
  <div class="w-full flex flex-col h-auto py-2 px-2">
    <div class="h-12 flex">
      <img :src="comment.account.avatar" class="w-10 h-10 rounded-full" />
      <p class="ml-4 font-muli font-bold">{{ comment.account.name }}</p>
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
