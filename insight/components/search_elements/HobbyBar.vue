<template>
  <div
    @click="navigate()"
    class="w-auto mx-2 rounded-lg mb-4 h-12 py-2 px-2 flex shadow-lg"
    style="background: #FD3F7E;"
  >
    <p class="w-8 h-8 text-center my-auto ml-2 pt-1 rounded-full font-muli text-pink-600 bg-white">
      {{ getHobbyAvatar }}
    </p>
    <p class="ml-6 mt-1 font-muli text-white">{{ hobby.name }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Hobby } from '@/types/index'
export default Vue.extend({
  props: {
    hobby: {} as PropOptions<Hobby>
  },
  computed: {
    getHobbyAvatar(): string {
      let avatar = ''
      if (this.hobby.name != undefined) {
        let splitted = this.hobby.name.split(' ')
        avatar =
          splitted[0][0].toUpperCase() + (splitted.length > 1)
            ? splitted[splitted.length - 1][0].toUpperCase()
            : splitted[0][splitted[0].length - 1].toUpperCase()
      }
      return avatar
    }
  },
  methods: {
    navigate(): void {
      this.$router.push(`/hobby/${this.hobby.code_name}`)
    }
  }
})
</script>
