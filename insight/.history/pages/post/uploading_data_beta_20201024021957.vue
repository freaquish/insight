<template> </template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import { ProgressAsset } from '@/plugins/FirebasePlugin'

export default Vue.extend({
  computed: {
    ...mapState('post/create_post', ['porgression'])
  },
  methods: {}
})
</script>

<style scoped></style>
