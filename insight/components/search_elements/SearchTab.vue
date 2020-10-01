<template>
  <div
    @click="$emit('tabbed', text)"
    :class="
      `w-auto ml-1 h-auto px-2 py-1 ${
        active
          ? 'border-2 border-purple-800 border-t-0 border-l-0 border-r-0'
          : 'border-0'
      }`
    "
  >
    <p
      :class="
        `font-lato text-xl text-black ${active ? 'font-bold text-purple-800' : 'font-normal'}`
      "
    >
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['text', 'active']
})
</script>

<style scoped></style>
