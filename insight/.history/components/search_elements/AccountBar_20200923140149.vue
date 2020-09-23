<template> </template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from '@/types/index'
export default Vue.extend({
  props: {
    user: {} as PropOptions<User>
  }
})
</script>
