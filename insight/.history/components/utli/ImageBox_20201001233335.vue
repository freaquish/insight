<template>
  <img :src="getAvatar" :class="getClass" />
</template>

<script lang="ts">
import Vue from 'vue'
import { avatarDefault } from '@/static/js/assets'

export default Vue.extend({
  props: ['src', 'class'],
  computed: {
    getAvatar(): string {
      if (this.src != undefined && this.src.length > 0) {
        return this.src
      }
      return avatarDefault
    },
    getClass(): string {
      return this.class != undefined ? this.class : ''
    }
  }
})
</script>

<style scoped></style>
