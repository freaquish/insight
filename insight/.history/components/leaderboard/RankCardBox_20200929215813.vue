<template>
  <div
    @click="$router.push(`/profile/${scorecard.account.username}`)"
    class="w-full rounded-md shadow-lg bg-white flex px-2 py-2 mb-1 h-16"
  >
    <p class="inline-block m-auto font-muli text-xl">{{ san_rank }}</p>
    <img
      :src="getAvatar"
      class="inline-block my-auto rounded-md w-10 h-10 ml-3"
    />
    <div class="w-full h-full flex flex-col ml-4 font-muli">
      <p class="text-sm text-pink-600">@{{ scorecard.account.username }}</p>
      <p class="font-bold truncate">{{ scorecard.account.name }}</p>
    </div>
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
