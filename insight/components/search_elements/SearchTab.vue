<template>
  <div
    @click="$emit('tabbed', text)"
    :class="
      `w-auto font-muli h-auto px-2 ml-4 mt-4 ${
        active
          ? 'border-b-4 border-purple-600'
          : 'border-0'
      }`
    "
  >
    <p
      :class="
        `text-lg ${
          active ? 'font-bold text-purple-600' : 'font-normal'
        }`
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
