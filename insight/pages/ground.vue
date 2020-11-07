<template>
  <div class="w-full h-screen">
      <div v-show="!show" class="w-full h-full">
          <button @click="show=true">Show</button>
          <p v-if="this.selected.length >0">{{selected[1]}}</p>
      </div>
      <CountryCode :show="show" @close="show=false" @select="select" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CountryCode from '@/components/auth/CountryCode.vue'
export default Vue.extend({
  components: {
    CountryCode
  },
  data() {
    return {
      show: false as boolean,
      selected:[] as string[]
    }
  },
  methods: {
      select(code: string[]): void {
          this.selected = code
          this.show = false
      }
  }
})
</script>

<style scoped>
</style>