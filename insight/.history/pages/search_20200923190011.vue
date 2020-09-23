<template>
  <div class="w-full h-full grided bg-tint-purple">
    <div class="w-full fixed flex pt-4 px-2">
      <span class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
      <div class="w-full h-full flex flex-row-reverse">
        <span class="material-icons stroke-current text-white">search</span>
      </div>
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
