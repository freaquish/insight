<template>
  <div
    @click="$emit('select', hobby)"
    :class="
      `w-auto h-auto px-4 py-2 shadow-xl  mx-1 rounded-md ${
        active ? 'text-white bg-pink-600' : 'text-blue-600 bg-white'
      }`
    "
  >
    <p class="font-muli text-lg" style="white-space:nowrap;">
      {{ hobby.name }}
    </p>
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
