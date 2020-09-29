<template>
  <client-only>
    <section class="block px-0 pt-3 fixed inset-x-0 bottom-0 z-10 w-full h-16">
      <div
        class="h-full rounded-md shadow-md bg-white  pt-2 text-black flex flex-row justify-around "
      >
        <div
          :class="
            `${
              isCurrentRoute('index')
                ? 'border-4 border-t-0 border-l-0 border-r-0 border-black'
                : ''
            }`
          "
        >
          <span @click="navigate('/', true)" class="material-icons text-3xl"
            >home</span
          >
        </div>
        <div
          :class="
            `${
              isCurrentRoute('search')
                ? 'border-4 border-t-0 border-l-0 border-r-0 border-black'
                : ''
            }`
          "
        >
          <span
            @click="navigate('/search', false)"
            class="material-icons text-3xl"
            >search</span
          >
        </div>

        <div
          :class="
            `${
              isCurrentRoute('post-hobby_window')
                ? 'border-4 border-t-0 border-l-0 border-r-0 border-black'
                : ''
            }`
          "
        >
          <span
            @click="navigate('/post/hobby_window', false)"
            class="material-icons text-3xl"
            >add</span
          >
        </div>

        <div
          :class="
            `${
              isCurrentRoute('leaderboard')
                ? 'border-4 border-t-0 border-l-0 border-r-0 border-black'
                : ''
            }`
          "
        >
          <span
            @click="navigate('/leaderboard', false)"
            class="material-icons text-3xl"
            >assessment</span
          >
        </div>

        <div
          :class="
            `${
              isCurrentRoute('settings')
                ? 'border-4 border-t-0 border-l-0 border-r-0 border-black'
                : ''
            }`
          "
        >
          <span
            @click="navigate('/settings', false)"
            class="material-icons text-3xl"
            >settings</span
          >
        </div>
      </div>
    </section>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    navigate(to: string, replace: boolean | undefined): void {
      if (replace === undefined || replace == false) {
        this.$router.push(to)
      } else {
        this.$router.replace(to)
      }
    },
    isCurrentRoute(route: string): boolean {
      return (
        this.$route.name != null &&
        this.$route.name != undefined &&
        this.$route.name === route
      )
    }
  }
})
</script>
