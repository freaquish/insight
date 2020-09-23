<template>
  <div style="height:95vh; margin-bottom:5vh;" class="bg"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RankCard, Hobby } from '@/types/index'

export default Vue.extend({})
</script>

<style scoped>
.bg {
  background: linear-gradient(
    90.53deg,
    #0868f7 4.13%,
    rgba(83, 149, 248, 0.89) 92.58%
  );
  display: grid;
  grid-template-rows: 5vh 90vh;
}
</style>
