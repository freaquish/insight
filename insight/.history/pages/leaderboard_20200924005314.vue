<template>
  <div style="height:95vh; margin-bottom:5vh;" class="bg">
    <!-- Header -->
    <div class="w-full flex pt-4 px-4">
      <span
        @click="$router.go(-1)"
        class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
      <div class="w-full flex justify-center">
        <p class="font-lato font-semibold text-white text-2xl">Leaderboard</p>
      </div>
    </div>

    <!-- Hobby -->
    <div class="w-full mt-2 px-4 overflow-x-scroll flex"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RankCard, Hobby } from '@/types/index'
import { mapState, mapActions } from 'vuex'
import HobbySelector from '@/components/leaderboard/HobbySelector.vue'

export default Vue.extend({
  mounted() {
    this.fetch([])
  },
  components: {
    HobbySelector
  },
  computed: {
    ...mapState('leaderboard', ['hobbies', 'users', 'selected'])
  },
  methods: {
    ...mapState('leaderboard', ['fetch'])
  }
})
</script>

<style scoped>
.bg {
  background: linear-gradient(
    90.53deg,
    #0868f7 4.13%,
    rgba(83, 149, 248, 0.89) 92.58%
  );
  display: grid;
  grid-template-rows: 5vh 8vh 82vh;
}
</style>
