<template>
  <div class="w-full h-full pb-20 flex flex-col overflow-y-scroll">
    <div class="bloack fixed w-full h-10 pt-2 glex px-2 bg-black">
      <span @click="navigateBack()" class="material-icons text-white"
        >keyboard_backspace</span
      >
    </div>
    <!-- Post Box -->
    <div v-if="JSON.stringify(this.post) != '{}'" class="w-full h-auto pt-10">
      <PostBox :propsAsset="post" :onep="true" @ecomment="enableComment()" />
    </div>

    <!-- Comment Count --->
    <div
      v-if="
        this.post.footer != undefined && this.post.footer.comments != undefined
      "
      class="w-full h-10 py-2 px-2"
    >
      <a href="/profile/self">
        <p class="font-lato text-gray-500">
          {{ sanitize(post.footer.action_map.comment) }} Comments
        </p></a
      >
    </div>

    <!-- Comments -->
    <div
      v-if="
        this.post.footer != undefined && this.post.footer.comments != undefined
      "
      class="w-full h-full overflow-x-hidden pb-2 pt-2"
    >
      <div
        v-for="comment in post.footer.comments"
        :key="post.footer.comments.indexOf(comment)"
      >
        <CommentBox :comment="comment" />
      </div>
    </div>

    <!-- Comment Input -->
    <div
      v-if="
        this.post.footer != undefined && this.post.footer.comments != undefined
      "
      class="w-full h-12 bg-transparent overfloe-y-auto"
    >
      <CommentInput :pid="post.post_id" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import PostBox from '@/components/post_elements/PostBox.vue'
import CommentBox from '@/components/post_elements/CommentBox.vue'
import CommentInput from '@/components/post_elements/CommentInput.vue'

export default Vue.extend({
  asyncData({ params }) {
    return { pid: params.pid }
  },
  data() {
    return {
      pid: '',
      showComments: true as boolean
    }
  },
  components: {
    PostBox,
    CommentBox,
    CommentInput
  },
  mounted() {
    if (this.pid.length > 0) {
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
    ]),
    ...mapMutations('post/one_post', ['clear']),
    navigateBack(): void {
      this.clear()
      this.$router.go(-1)
    },
    sanitize(num: number): string {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
      }
      return num.toString()
    }
  }
})
</script>

<style scoped></style>
