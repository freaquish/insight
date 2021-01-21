<template>
  <div
    @click="onClick()"
    class="w-auto mx-2 rounded-lg mb-2 h-auto py-4 px-2 flex shadow-lg"
    style="background: #AC25FF;"
  >
    <p class="w-8 h-8 text-center my-auto ml-2 pt-1 rounded-full font-muli text-purple-600 bg-white">
      {{ tag.avatar }}
    </p>
    <p class="font-muli ml-6 mt-1 text-lg font-lato font-semibold text-white">{{ tag.tag }}</p>
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
