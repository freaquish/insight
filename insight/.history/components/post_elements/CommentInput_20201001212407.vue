<template>
  <div
    class="w-full h-auto flex px-2 pt-2 border-0 border-gray-300 border-b-0 border-r-0 border-l-0"
  >
    <div class="w-full flex h-auto bg-gray-300 pr-2 py-1 rounded-md">
      <textarea
        v-model="commentText"
        placeholder="Comment..."
        @input="commentInput"
        :rows="row"
        class="w-full pl-2 font-muli text-gray-700 py-1 pr-1 rounded-md focus:outline-none  bg-gray-300 mr-1"
      ></textarea>
      <div
        @click="send()"
        class="w-auto h-auto px-3 bg-pink-600 inline-block m-auto rounded-md"
      >
        <span class="material-icons mt-2 text-white">send</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  props: ['pid'],
  mounted() {},
  data() {
    return {
      commentText: undefined as string | undefined,
      row: 1
    }
  },
  methods: {
    ...mapActions('profile/one_post', ['createComment']),
    commentInput(): void {
      if (
        this.commentText != undefined &&
        this.commentText.charAt(this.commentText.length - 1) === '\n'
      ) {
        let broken = this.commentText.split('\n')
        this.row = broken.length
      }
    },
    send(): void {
      if (this.commentText != undefined && this.commentText.length > 0) {
        this.createComment({
          post_id: this.pid,
          comment: this.commentText
        })
      }
    }
  }
})
</script>

<style scoped></style>
