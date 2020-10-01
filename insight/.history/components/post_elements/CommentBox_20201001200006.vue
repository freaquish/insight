<template>
  <div class="w-full relative h-auto py-2 px-2">
    <div class="w-full h-full absolute z-0 bg-black"></div>
    <div class="w-full h-full absolute z-10">
      <img
        :src="comment.account.avatar"
        class="w-12 h-12 shadow-lg rounded-md"
      />
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
