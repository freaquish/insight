<template>
  <div class="w-full h-full pb-16 flex flex-col">
    <div class="bloack fixed w-full h-12 pt-2 glex px-2 bg-black">
      <span class="material-icons text-white">keyboard_backspace</span>
    </div>
    <div class="w-full h-auto pt-2"></div>
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
