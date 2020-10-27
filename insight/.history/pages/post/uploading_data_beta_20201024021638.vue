<template> </template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  computed: {
    ...mapState('post/create_post', ['porgression'])
  }
})
</script>

<style scoped></style>
