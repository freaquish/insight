<template>
  <div
    @click="onClick()"
    class="w-full h-auto py-2 px-2 flex bg-tint-purple-shallow"
  >
    <p class="px-2 py-2 bg-blue-500 text-white font-muli">{{ tag.avatar }}</p>
    <p class="font-muli text-white">{{ tag.tag }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Tag } from '@/types/index'

export default Vue.extend({
  props: {
    tag: {} as PropOptions<Tag>
  },
  methods: {
    onClick(): void {
      this.$router.push(`/hastag/${this.tag.tag.replace('#', '')}`)
    }
  }
})
</script>
