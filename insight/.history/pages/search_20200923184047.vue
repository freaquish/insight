<template>
  <div class="w-full h-full grided bg-tint-purple">
    <div class="w-full fixed flex">
      <span class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 5vh 90vh;
}
</style>
