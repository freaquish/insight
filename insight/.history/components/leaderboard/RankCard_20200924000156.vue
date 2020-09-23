<template>
  <div class="w-full h-auto px-2 py-2 flex bg-white"></div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { RankCard } from '@/types/index'

export default Vue.extend({
  props: {
    scorecard: {} as PropOptions<RankCard>
  }
})
</script>

<style scoped></style>
