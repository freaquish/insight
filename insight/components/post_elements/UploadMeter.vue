<template>
  <div class="w-full px-4 py-2 rounded-md shadow-lg flex my-1 h-16">
    <div class="inline-block">
      <span v-if="this.progress.type === 'image'" class="material-icons rounded-full px-1 py-1 bg-green-100 text-green-500 text-3xl">
        wallpaper
      </span>
      <span v-else-if="this.progress.type === 'video'" class="material-icons rounded-full px-1 py-1 bg-red-200 text-red-600 text-3xl mt-1">videocam</span>
      <span v-else-if="this.progress.type === 'audio'" class="material-icons rounded-full px-1 py-1 bg-blue-100 text-blue-600 text-3xl mt-1">graphic_eq</span>
    </div>
    <div class="w-full h-full flex flex-row-reverse">
      <p class="font-muli text-gray-700 text-sm mt-3">{{progress.progress}}%</p>
      <div class="w-full h-1 bg-gray-300 mx-3 mt-5 rounded-full">
        <div v-if="this.progress.progress === 100" class="h-1 rounded-full w-full bg-green-400"></div>
        <div v-else class="h-1 w-full bg-purple-600 rounded-full" :style="`width: ${percentage}%;`"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ProgressAsset } from '@/plugins/FirebasePlugin'

export default Vue.extend({
  props: {
    progress: {} as PropOptions<ProgressAsset>
  },
  computed: {
    percentage(): string {
      return this.progress.progress.toFixed(1)
    }
  }
})
</script>

<style scoped>
</style>
