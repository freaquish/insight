<template>
  <client-only>
    <section class="block px-0 pt-2  fixed inset-x-0 bottom-0 z-10 w-full h-16">
      <div
        class="h-full pb-2 shadow-md border-0 border-b-0 border-l-0 border-r-0 border-gray-400 bg-white  pt-2 text-black flex flex-row justify-around "
      >
        <div
          :class="
            `${
              isCurrentRoute('index')
                ? 'block px-2 pt-1 pb-1 rounded-md bg-gray-200 text-pink-600'
                : ''
            }`
          "
        >
          <p class="flex">
            <span @click="navigate('/', true)" class="material-icons text-3xl"
              >home</span
            >
            <span
              v-if="this.isCurrentRoute('index')"
              class="font-lato font-semibold text-pink-600 ml-2 mt-1"
              >Home</span
            >
          </p>
        </div>
        <div
          :class="
            `${
              isCurrentRoute('search')
                ? 'block px-2 pt-1 pb-1 rounded-md bg-gray-200 text-pink-600'
                : ''
            }`
          "
        >
          <p class="flex">
            <span
              @click="navigate('/search', false)"
              class="material-icons text-3xl"
              >search</span
            >
            <span
              v-if="this.isCurrentRoute('search')"
              class="font-lato font-semibold text-pink-600 ml-2 mt-1"
              >Search</span
            >
          </p>
        </div>

        <div
          :class="
            `${
              isCurrentRoute('post-hobby_window')
                ? 'block px-2 pt-1 pb-1 rounded-md bg-gray-200 text-pink-600'
                : ''
            }`
          "
        >
          <p class="flex">
            <span
              @click="navigate('/post/hobby_window', false)"
              class="material-icons text-3xl"
              >add</span
            >
            <span
              v-if="this.isCurrentRoute('post-hobby_window')"
              class="font-lato font-semibold text-pink-600 ml-2 mt-1"
              >Add</span
            >
          </p>
        </div>

        <div
          :class="
            `${
              isCurrentRoute('leaderboard')
                ? 'block px-2 pt-1 pb-1 rounded-md bg-gray-200 text-pink-600'
                : ''
            }`
          "
        >
          <p class="flex">
            <span
              @click="navigate('/leaderboard', false)"
              class="material-icons text-3xl"
              >assessment</span
            >
            <span
              v-if="this.isCurrentRoute('leaderboard')"
              class="font-lato font-semibold text-pink-600 ml-2 mt-1"
              >Leaderboard</span
            >
          </p>
        </div>

        <div
          :class="
            `${
              isCurrentRoute('settings')
                ? 'block px-2 pt-1 pb-1 rounded-md bg-gray-200 text-pink-600'
                : ''
            }`
          "
        >
          <p>
            <span
              @click="navigate('/settings', false)"
              class="material-icons text-3xl"
              >settings</span
            >
            <span
              v-if="this.isCurrentRoute('settings')"
              class="font-lato font-semibold text-pink-600 ml-2 mt-1"
              >Settings</span
            >
          </p>
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
