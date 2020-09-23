<template>
  <div class="w-full h-full bg-tint-purple grided" style="height:95vh;">
    <div class="w-full h-full px-4 pt-4">
      <span
        @click="$router.go(-1)"
        class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ params }) {
    return { stype: params.stype, value: params.value }
  }
})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 5% 95%;
}
</style>
