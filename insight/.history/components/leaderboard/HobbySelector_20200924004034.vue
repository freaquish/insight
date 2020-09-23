<template>
  <div></div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Hobby } from '@/types/index'

export default Vue.extend({
  props: {
    hobby: {} as PropOptions<Hobby>
  }
})
</script>

<style scoped></style>
