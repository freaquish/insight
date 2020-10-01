<template>
  <div class="w-full mb-4 flex flex-col h-auto py-1 px-2">
    <div
      @click="$router.push(`/profile/${comment.account.username}`)"
      class="h-auto flex"
    >
      <ImageBox :src="comment.account.avatar" class="w-10 h-10 rounded-full" />
      <div class="flex flex-col w-auto h-full">
        <p class="ml-3 font-lato font-bold truncate">
          {{ comment.account.name }}
        </p>
        <span
          class="ml-3 text-blue-700 font-montserrat font-medium text-sm truncate"
          >@{{ comment.account.username }}</span
        >
      </div>
      <div class="w-full h-full flex flex-row-reverse pr-4">
        <p class="font-lato text-sm text-gray-600">{{ comment.created }}</p>
      </div>
    </div>
    <div class="h-auto pr-12 mt-1" style="padding-left:3.2rem;">
      <p class="font-muli break-words" v-html="comment.comment"></p>
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
