<template>
  <client-only>
    <section class="block px-0 pt-2 fixed inset-x-0 bottom-0 z-10 w-full h-16">
      <div
        class="h-full rounded-t-lg pb-2 shadow-md border-0 border-b-0 border-l-0 border-r-0 border-gray-400 bg-white pt-2 text-black flex flex-row justify-around"
      >
        <div
          :class="`${
            isCurrentRoute('index') ? 'block pb-1 text-indigo-700' : ''
          }`"
        >
          <p class="flex">
            <span @click="navigate('/', true)" class="material-icons text-3xl"
              >home</span
            >
          </p>
        </div>
        <div
          :class="`${
            isCurrentRoute('search') ? 'block pb-1 text-indigo-700' : ''
          }`"
        >
          <p class="flex">
            <span
              @click="navigate('/search', false)"
              class="material-icons text-3xl"
              >search</span
            >
            <!-- <span class="text-sx font-lato">search</span> -->
          </p>
        </div>

        <div
          :class="`${
            isCurrentRoute('post-hobby_window')
              ? 'block pb-1 text-indigo-700'
              : ''
          }`"
        >
          <p class="flex">
            <span
              @click="navigate('/post/hobby_window', false)"
              class="material-icons text-3xl"
              >add</span
            >
          </p>
        </div>

        <div
          :class="`${
            isCurrentRoute('discover') ? 'block pb-1 text-indigo-700' : ''
          }`"
        >
          <p class="flex">
            <img @click="navigate('/discover', false)" :src="require('@/assets/svg/telescope.svg')" class="w-8 h-8" />
          </p>
        </div>

        <!-- <div
          :class="`${
            isCurrentRoute('leaderboard') ? 'block pb-1 text-indigo-700' : ''
          }`"
        >
          <p class="flex">
            <span
              @click="navigate('/leaderboard', false)"
              class="material-icons text-3xl"
              >assessment</span
            >
          </p>
        </div> -->
      </div>
    </section>
  </client-only>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    data() {
      return {
        telescope: require('@/assets/svg/telescope.svg'),
      }
    },
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
    },
  },
})
</script>