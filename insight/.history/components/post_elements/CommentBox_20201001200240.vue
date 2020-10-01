<template>
  <div class="w-full flex flex-col h-auto py-2 px-2">
    <div class="h-12 flex">
      <img :src="comment.account.avatar" class="w-12 h-12 rounded-full" />
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
