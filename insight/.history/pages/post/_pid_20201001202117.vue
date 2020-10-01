<template>
  <div class="w-full h-full pb-16 flex flex-col">
    <div class="bloack fixed w-full h-10 pt-2 glex px-2 bg-black">
      <span class="material-icons text-white">keyboard_backspace</span>
    </div>
    <!-- Post Box -->
    <div v-if="JSON.stringify(this.post) != '{}'" class="w-full h-auto pt-10">
      <PostBox
        :propsAsset="post"
        :isComment="true"
        :onep="true"
        @ecomment="enableComment()"
      />
    </div>

    <!-- Comments -->
    <div
      v-if="
        this.post.footer != undefined && this.post.footer.comments != undefined
      "
      class="w-full h-full overflow-x-hidden overflow-y-scroll pb-16 pt-2"
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
      class="w-full h-12 block fixed bg-black inset-x-0 bottom-0 mb-12"
    >
      <CommentInput />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
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
    enableComment() {
      this.showComments = !this.showComments
    }
  }
})
</script>

<style scoped></style>
