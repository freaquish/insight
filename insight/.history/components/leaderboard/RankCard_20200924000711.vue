<template>
  <div class="w-full h-auto px-2 py-2 flex justify-between bg-white">
    <img :src="getAvatar" class="w-10 h-10 rounded-md" />
    <p>{{ san_score }}</p>
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
    }
  }
})
</script>

<style scoped></style>
