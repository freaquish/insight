<template> </template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Hobby } from '@/types/index'
export default Vue.extend({
  props: {
    hobby: {} as PropOptions<Hobby>
  },
  computed: {
    getHobbyAvatar(): string {
      let avatar = ''
      if (this.hobby.name != undefined) {
        avatar = this.hobby.name[0]
      }
      return avatar
    }
  }
})
</script>
