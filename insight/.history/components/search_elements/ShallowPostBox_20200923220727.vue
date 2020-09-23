<template>
  <div></div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ShallowPost } from '@/types/index'

export default Vue.extend({
  props: {
    post: {} as PropOptions<ShallowPost>
  }
})
</script>

<style scoped></style>
