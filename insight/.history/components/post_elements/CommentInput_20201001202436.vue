<template>
  <div class="w-full h-auto flex">
    <input v-model="commentText" class="w-full bg-gray-300 mx-2" />
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
