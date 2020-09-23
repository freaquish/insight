<template>
  <div
    :class="
      `w-auto h-auto px-2 py-2 ${
        active ? 'border-2 border-t-0 border-l-0 border-r-0' : 'border-0'
      }`
    "
  >
    <p :class="`font-lato text-xl ${active ? 'font-bold' : 'font-normal'}`">
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
