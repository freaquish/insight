<template>
  <div
    @click="$router.push(`/profile/${scorecard.account.username}`)"
    class="w-full rounded-md shadow-lg bg-white flex px-2 py-2 mb-1"
  >
    <p class="font-muli text-xl">{{ san_rank }}</p>
    <img :src="getAvatar" />
    <div class="w-full h-full flex flex-col"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { RankCard } from '@/types/index'
import { avatarDefault } from '~/static/js/assets'

export default Vue.extend({
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
      return this.scorecard.rank < 1000
        ? this.scorecard.rank.toString()
        : `${this.scorecard.rank}K`
    }
  }
})
</script>

<style scoped></style>
