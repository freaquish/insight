<template>
  <div class="w-full h-screen flex flex-col justify-center">
    <div class="w-full flex h-auto justify-center">
      <div class="h-full w-auto flex flex-col">
        <img :src="getImage" class="w-56 mx-auto" />
        <h1
          class="w-full mt-8 text-center font-lato font-bold text-xl text-gray-900"
        >
          {{ getHeading }}
        </h1>
        <p class="w-full text-center font-lato font-bold text-2xl">
          {{ getSubHeading }}
        </p>
        <div class="w-full flex mt-4 justify-center">
          <button
            @click="$router.replace('/')"
            class="w-auto bg-green-400 text-white font-muli font-semibold px-4 py-2 rounded-md"
          >
            Get me Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      svgs: [
        require('@/assets/svg/404.svg'),
        require('@/assets/svg/404_women.svg'),
      ] as any[],

      heading: [
        `WHEN I SEARCHED THE PAGE IN MY HEART`,
        'THIS PAGE IS LIKE YOUR GIRLFRIEND',
      ] as string[],
      sub: ['IT GAVE ME 404', 'DOES NOT EXIST'] as string[],
      index: 0 as number,
    }
  },
  computed: {
    getImage(): any {
      this.index = this.getRandomFromArray(this.svgs.length)
      return this.svgs[this.index]
    },
    getHeading(): string {
      return this.heading[this.index]
    },
    getSubHeading(): string {
      return this.sub[this.index]
    },
  },
  methods: {
    getRandomFromArray(length: number): number {
      return Math.floor(Math.random() * length)
    },
  },
})
</script>