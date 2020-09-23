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
        let splitted = this.hobby.name.split(' ')
        if (splitted.length === 1) {
          avatar =
            splitted[0][0].toUpperCase() +
            splitted[0][splitted[0].length - 1].toUpperCase()
        } else if (splitted.length > 1) {
          avatar =
            splitted[0][0].toUpperCase() +
            splitted[splitted.length - 1][0].toUpperCase()
        }
      }
      return avatar
    }
  }
})
</script>
