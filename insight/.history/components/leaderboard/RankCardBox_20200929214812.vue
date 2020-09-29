<template>
  <div
    @click="$router.push(`/profile/${scorecard.account.username}`)"
    class="w-full rounded-md shadow-lg mb-1 h-auto px-2 py-2 flex justify-between bg-white"
  >
    <div class="w-auto flex">
      <div class="w-auto flex mt-1">
        <!-- <span class="material-icons stroke-current text-pink-600"
          >emoji_events</span
        > -->
        <span class="font-muli text-pink-600 ml-1">{{ san_rank }}</span>
      </div>
      <img :src="getAvatar" class="w-10 h-10 mt-1 ml-2 rounded-md" />
      <div class="w-auto ml-3 flex flex-col h-auto">
        <p class="text-pink-600">@{{ scorecard.account.username }}</p>
        <p class="font-muli  mt-0 font-bold">
          {{ scorecard.account.name }}
        </p>
      </div>
    </div>
    <p class="font-muli font-bold mt-1 text-green-400">
      {{ san_score }}
    </p>
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
