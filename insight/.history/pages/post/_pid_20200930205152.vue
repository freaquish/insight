<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { OnePost, Comment } from '@/types/index'

export default Vue.extend({
  computed: {
    ...mapState('post/one_post', ['post'])
  },
  methods: {
    ...mapActions('post/one_post', [
      'fetchPost',
      'fetchComment',
      'createComment'
    ])
  }
})
</script>

<style scoped></style>
