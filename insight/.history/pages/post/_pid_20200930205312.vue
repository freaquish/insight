<template>
  <div class="w-full h-full pt-4 pb-16 flex flex-col">
    <div class="w-full h-12 glex px-2 bg-black">
      <span class="material-icons text-white">keyboard_backspace</span>
    </div>
  </div>
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
