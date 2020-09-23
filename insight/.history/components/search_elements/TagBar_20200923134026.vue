<template>
  <div class="w-full h-auto py-2 px-2 flex bg-tint-purple-shallow"></div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Tag } from '@/types/index'

export default Vue.extend({
  props: {
    tag: {} as PropOptions<Tag>
  }
})
</script>
