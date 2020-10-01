<template>
  <div class="w-full mb-4 flex flex-col h-auto py-1 px-2">
    <div
      @click="$router.push(`/profile/${comment.account.username}`)"
      class="h-auto flex"
    >
      <ImageBox
        :src="comment.account.avatar"
        :class="'w-10 h-10 rounded-full'"
      />
      <p class="ml-3 inline-block m-auto font-lato font-bold">
        {{ comment.account.name }}
      </p>
    </div>
    <div class="h-auto pr-12" style="padding-left:3.2rem;">
      <p class="font-muli break-words">{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Comment } from '@/types/index'
import ImageBox from '@/components/utli/ImageBox.vue'

export default Vue.extend({
  components: {
    ImageBox
  },
  props: {
    comment: {} as PropOptions<Comment>
  }
})
</script>

<style scoped></style>
