<template>
  <div class="w-full h-full bg-tint-purple" style="height:95vh;"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ params }) {
    return { stype: params.stype, value: params.value }
  }
})
</script>

<style scoped></style>
