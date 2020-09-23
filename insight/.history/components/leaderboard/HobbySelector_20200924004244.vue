<template>
  <div
    :class="
      `w-auto h-auto px-2 py-1 shadow-lg ${
        active ? 'text-white bg-pink-600' : 'text-blue-600 bg-white'
      }`
    "
  >
    <p class="font-muli">{{ hobby.name }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Hobby } from '@/types/index'

export default Vue.extend({
  props: {
    hobby: {} as PropOptions<Hobby>,
    active: false as PropOptions<boolean>
  }
})
</script>

<style scoped></style>
