<template>
  <div
    class="w-full h-auto flex px-2 pt-2 border-0 border-gray-300 border-b-0 border-r-0 border-l-0"
  >
    <div class="w-full flex h-auto bg-gray-300 pr-2 py-1 rounded-md">
      <div
        contenteditable="true"
        placeholder="Comment..."
        @input="commentInput"
        :rows="row"
        class="w-full pl-2 font-muli text-gray-700 py-1 pr-1 rounded-md focus:outline-none  bg-gray-300 mr-1"
      ></div>
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
    ...mapActions('post/one_post', ['createComment']),
    decorate(text: string): string {
      return `<span class="font-montserrat ${
        text.includes('@') ? 'text-blue-700' : 'text-blue-500'
      }">${text}</span>`
    },
    commentInput(): void {
      if (
        this.commentText != undefined &&
        this.commentText.charAt(this.commentText.length - 1) === '\n'
      ) {
        let broken = this.commentText.split('\n')
        this.row = broken.length
      } else if (
        this.commentText != undefined &&
        (this.commentText.includes('@') || this.commentText.includes('#'))
      ) {
        let splitted = this.commentText.match(/@[a-z0-9]+|#[a-z0-9]+/gi)
        if (splitted != null && splitted.length > 0) {
          let text = this.commentText
          for (let split of splitted) {
            text = text.replace(split, this.decorate(split))
          }
          this.commentText = text
          console.log(this.commentText, text)
        }
      }
    },
    send(): void {
      if (this.commentText != undefined && this.commentText.length > 0) {
        this.createComment({
          post_id: this.pid,
          comment: this.commentText,
          complete: () => {
            this.commentText = undefined
            this.row = 1
          }
        })
      }
    }
  }
})
</script>

<style scoped></style>
