<template>
  <div class="w-full h-full pb-16 flex flex-col">
    <div class="bloack fixed w-full h-12 pt-2 glex px-2 bg-black">
      <span class="material-icons text-white">keyboard_backspace</span>
    </div>
    <div class="w-full h-auto pt-10">
      <PostBox :propsAsset="post" :isComment="true" :onep="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import PostBox from '@/components/post_elements/PostBox.vue'

export default Vue.extend({
  asyncData({ params }) {
    return { pid: params.pid }
  },
  data() {
    return {
      pid: ''
    }
  },
  components: {
    PostBox
  },
  mounted() {
    if (this.pid.length > 0) {
      console.log(this.pid)
      this.fetchPost(this.pid)
    }
  },
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
