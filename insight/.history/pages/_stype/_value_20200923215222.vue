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
import { ShallowPost } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'

export default Vue.extend({
  asyncData({ params }) {
    return { stype: params.stype, value: params.value }
  },
  mounted() {
    this.storage = new FrozenStorage()
    this.fetch()
  },
  data() {
    return {
      posts: [] as ShallowPost[],
      stype: '' as string,
      value: '' as string,
      name: '' as string,
      count: 0 as number,
      storage: undefined as FrozenStorage | undefined
    }
  },

  methods: {
    fetch(): void {
      if (this.storage != undefined) {
        if (
          this.$axios.defaults.headers.common['Authorization'] === undefined
        ) {
          this.$axios.setHeader('Authorization', this.storage.get('token'))
        }

        this.$axios.get(`search/meta?${this.stype}=${this.value}`)
      }
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
