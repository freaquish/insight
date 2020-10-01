<template>
  <div
    class="w-full h-auto flex px-2 pt-2 border border-gray-300 border-b-0 border-r-0 border-l-0"
  >
    <div class="w-full flex h-auto bg-gray-300 pr-2 py-2 rounded-md">
      <textarea
        v-model="commentText"
        placeholder="Comment..."
        @input="commentInput"
        :rows="row"
        class="w-full pl-2 font-muli text-gray-700 py-1 pr-1 rounded-md focus:outline-none  bg-gray-300 mr-1"
      ></textarea>
      <div
        class="w-auto h-auto px-3 bg-pink-600 inline-block m-auto rounded-md"
      >
        <span class="material-icons mt-2 text-white">send</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {},
  data() {
    return {
      commentText: undefined as string | undefined,
      row: 1
    }
  },
  methods: {
    commentInput() {
      if (
        this.commentText != undefined &&
        this.commentText.charAt(this.commentText.length - 1) === '\n'
      ) {
      }
    }
  }
})
</script>

<style scoped></style>
