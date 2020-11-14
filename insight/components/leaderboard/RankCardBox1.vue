<template>
  <div
    @click="$router.push(`/profile/${scorecard.account.username}`)"
    class="w-full rounded-md shadow-lg flex px-2 py-2 mb-1 h-16"
    :style="{background: activeColor}"
  >
    <div class="inline-block m-auto font-muli text-xl w-16 h-full">
      <div v-if="1<= san_rank <= 3">
        <!-- <img :src="require(`../assets/badges/rankBadge${san_rank}.svg`)"> -->
      </div>
      <div v-else>{{ san_rank }}.</div>
      </div>
    <img
      :src="getAvatar"
      class="inline-block my-auto rounded-full w-10 h-10 ml-4"
    />
    <div class="w-full h-full flex flex-col ml-4 font-muli">
      <p class="text-sm text-pink-600" :style="{color: accColor}" >@{{ scorecard.account.username }}</p>
      <p class="font-bold truncate">{{ scorecard.account.name }}</p>
    </div>
    <p
      v-if="false"
      class="inline-block m-auto font-muli text-green-400 font-bold"
    >
      {{ san_score }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { RankCard } from '@/types/index'
import { avatarDefault } from '~/static/js/assets'

export default Vue.extend({
    data() {
        return {
            activeColor: 'white',
            accColor:'pink',          
        }
    },
  props: {
    scorecard: {} as PropOptions<RankCard>
  },
  computed: {
    getAvatar(): string {
      return this.scorecard.account.avatar != undefined &&
        this.scorecard.account.avatar.length > 0
        ? this.scorecard.account.avatar
        : avatarDefault
    },
    san_score(): string {
      return this.scorecard.score < 1000
        ? this.scorecard.score.toFixed(2)
        : `${this.scorecard.score.toFixed(2)}K`
    },
    san_rank(): string {
        if (this.scorecard.rank == 1) {
            this.activeColor = '#A0A0ED';
            this.accColor = 'white';
        }else if (this.scorecard.rank == 2) {
            this.activeColor = '#B4A0ED';
            this.accColor = 'white';
        }else if (this.scorecard.rank == 3) {
            this.activeColor = '#D0A0ED';
            this.accColor = 'white';
        }else{
            this.activeColor = 'white';
            this.accColor = 'black';
        }

      return this.scorecard.rank < 1000
        ? this.scorecard.rank.toString()
        : `${this.scorecard.rank}K`
    },

  },
})
</script>

<style scoped></style>
