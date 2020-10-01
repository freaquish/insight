<template>
  <div class="w-full h-auto flex">
    <textarea
      v-model="commentText"
      placeholder="Comment..."
      class="w-full pl-2 font-muli text-gray-700 py-2 pr-1 rounded-md focus:outline-none border border-gray-200 bg-gray-300 ml-2"
    ></textarea>
    <div class="w-auto h-auto px-3 bg-blue-500 inline-block m-auto">
      <span class="material-icons mt-1">send</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      commentText: undefined as string | undefined
    }
  }
})
</script>

<style scoped></style>
