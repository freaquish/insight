<template>
  <div
    @scroll="onScroll"
    class="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden pt-20"
  >
    <div class="w-full pb-56">
      <BarImageBox
        :user1="getFirstUser"
        :user2="getSecondUser"
        :user3="getThirdUser"
      />
    </div>

    <div
      id="card-container"
      class="w-full h-full mt-48 flex flex-col pt-4 pb-12 px-0"
    >
      <div class="w-full sticky flex flex-row-reverse">
        <button @click="$emit('scroll-self')" v-if="!this.isContainerOverflown" class="pl-3 pr-4 bg-pink-600 pt-2 rounded-l-full">
          <span class="material-icons text-white"> gps_fixed </span>
        </button>
      </div>
      <div v-for="user in getRestUsers" :key="users.indexOf(user)">
        <ScoreCard :user="user" :containerOverflown="isContainerOverflown" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RankCard } from '@/types/index'
import BarImageBox from '@/components/leaderboard/BarImageBox.vue'
import ScoreCard from '@/components/leaderboard/ScoreCard.vue'
export default Vue.extend({
  components: {
    BarImageBox,
    ScoreCard,
  },
  props: ['isContainerOverflown'],
  computed: {
    ...mapState('leaderboard', ['users']),
    getFirstUser(): RankCard | undefined {
      return this.users.length > 0 && this.users[0].rank === 1
        ? this.users[0]
        : undefined
    },
    getSecondUser(): RankCard | undefined {
      return this.users.length > 1 && this.users[1].rank === 2
        ? this.users[1]
        : undefined
    },
    getThirdUser(): RankCard | undefined {
      return this.users.length > 2 && this.users[2].rank === 3
        ? this.users[2]
        : undefined
    },
    getRestUsers(): RankCard[] {
      return this.users.slice(3)
    },
  },
  methods: {
    onScroll(): void {
      let elem = this.$el.querySelector('#card-container')
      if (elem != undefined) {
        let bound = elem.getBoundingClientRect()
        if (bound != undefined && bound.top <= 304) {
          this.$emit('overflown', true)
        } else {
          this.$emit('overflown', false)
        }
      }
    },
  },
})
</script>

<style >
.bg-white-85 {
  background: rgba(255, 255, 255, 0.95);
}
</style>