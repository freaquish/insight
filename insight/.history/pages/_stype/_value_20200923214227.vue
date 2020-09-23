<template>
  <div class="w-full h-full bg-tint-purple grided" style="height:95vh;">
    <div class="w-full fixed h-full px-2 pt-4">
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
import { ShallowPost, ShallowPostI } from '@/types/index'

export default Vue.extend({
  asyncData({ params }) {
    return { stype: params.stype, value: params.value }
  },
  data() {
    return {
      posts: [] as ShallowPost[],
      name: '' as string,
      count: 0 as number
    }
  }
})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 5% 95%;
}
</style>
