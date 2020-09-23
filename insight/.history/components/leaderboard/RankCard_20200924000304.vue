<template>
  <div class="w-full h-auto px-2 py-2 flex bg-white"></div>
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
    }
  }
})
</script>

<style scoped></style>
