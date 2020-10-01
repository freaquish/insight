<template>
  <div class="w-full flex flex-col">
    <div class="w-full h-16 py-1 px-2">
      <img :src="comment.account.avatar" />
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
