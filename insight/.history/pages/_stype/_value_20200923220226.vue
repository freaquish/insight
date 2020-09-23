<template>
  <div class="w-full h-full bg-tint-purple grided" style="height:95vh;">
    <div class="w-full fixed h-full px-2 pt-4">
      <span
        @click="$router.go(-1)"
        class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
    </div>
    <div class="w-full h-full flex flex-col overflow-y-scroll mt-10">
      <div class="w-full h-auto py-2 px-2 flex justify-between">
        <div class="flex w-auto h-full">
          <p class="font-lato text-3xl text-white">{{ name }}</p>
          <p class="font-montserrat ml-4">{{ count }} posts</p>
        </div>
        <p
          :class="
            `font-lato font-bold ${
              this.stype === 'hobby' ? 'text-pink-600' : 'text-blue-600'
            }`
          "
        >
          {{ sanitizedStype }}
        </p>
      </div>
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

  computed: {
    sanitizedStype(): string {
      return (
        this.stype[0].toUpperCase() + this.stype.substring(1, this.stype.length)
      )
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

        this.$axios.get(`search/meta?${this.stype}=${this.value}`).then(res => {
          if (res.status === 200) {
            this.posts = res.data.posts
            this.name = res.data.name
            this.count = res.data.count
          }
        })
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
