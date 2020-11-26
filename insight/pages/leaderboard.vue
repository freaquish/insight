<template>
  <div class="w-full h-full min-h-screen relative">
    <div class="w-full h-full fixed z-0">
      <Background />
    </div>
    <div v-if="false" class="w-full h-full fixed z-10">
      <BarLayer />
    </div>

    <div class="w-full h-full absolute z-20">
      <div class="w-full h-full relative flex flex-col">
        <Header
          @scroll-self="scrollToSelf"
          :isScoreCardOverflowed="isContainerOverflown"
          @hamclick="showAppDrawer = true"
        />
        <ScoreLayer
          @scroll-self="scrollToSelf"
          @overflown="overflown"
          :isContainerOverflown="isContainerOverflown"
        />
      </div>
    </div>

    <div v-if="this.showAppDrawer" class="w-full h-full pl-16 absolute z-30">
      <div class="w-full h-full bg-white flex flex-col shadow-lg pt-4 px-2">
        <span @click="showAppDrawer = false" class="material-icons text-4xl"
          >clear</span
        >

        <p
          @click="sortBy('loves')"
          class="font-lato font-semibold text-3xl xs:text-2xl mt-16 px-2 py-2"
        >
          Most Loved
        </p>

        <p
          @click="sortBy('views')"
          class="font-lato font-semibold text-3xl xs:text-2xl mt-4 px-2 py-2"
        >
          Most Viewed
        </p>

        <p
          @click="sortBy(undefined)"
          class="font-lato font-semibold text-3xl xs:text-2xl mt-4 px-2 py-2"
        >
          Highest Score
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Background from '@/components/leaderboard/Background.vue'
import BarLayer from '@/components/leaderboard/BarLayer.vue'
import ScoreLayer from '@/components/leaderboard/ScoreLayer.vue'
import Header from '@/components/leaderboard/Header.vue'

import {mapActions} from 'vuex'
import Vue from 'vue'
export default Vue.extend({
  components: {
    Background,
    BarLayer,
    ScoreLayer,
    Header
  },
  mounted(){
      this.fetchLeaderboard({})
  },
  data(){
      return {
          isContainerOverflown: false,
          showAppDrawer: false
      }
  },
  methods: {
      ...mapActions("leaderboard", ['fetchLeaderboard']),
      overflown(over: boolean): void{
          this.isContainerOverflown = over
      },
      sortBy(sort?: string): void {
          this.fetchLeaderboard({sort:sort})
          this.showAppDrawer = false
      },
      scrollToSelf(): void {
        let elem = this.$el.querySelector('[data-self="true"]') as HTMLDivElement | undefined
        if(elem != undefined){
            elem.scrollIntoView({block:"center", behavior:"smooth"})
        }
    },
    
  }
})
</script>