<template>
  <img :src="getAvatar" />
</template>

<script lang="ts">
import Vue from 'vue'
import { avatarDefault } from '@/static/js/assets'

export default Vue.extend({
  props: ['src'],
  computed: {
    getAvatar(): string {
      if (this.src != undefined && this.src.length > 0) {
        return this.src
      }
      return avatarDefault
    }
  }
})
</script>

<style scoped></style>
