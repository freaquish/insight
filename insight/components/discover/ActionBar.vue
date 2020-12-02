<template>
  <div class="w-full h-auto mt-2 bg-transparent px-4 py-2 flex overflow-hidden">
    <!-- Love -->
    <button class="w-auto focus:outline-none px-2 py-0">
      <span
        @click="bindAction('love')"
        v-if="this.post.meta.actions.loved === 0"
        class="fa fa-heart-o text-2xl text-red-500"
        aria-hidden="true"
      ></span>
      <span
        v-else
        @click="bindAction('un_love')"
        class="fa fa-heart text-2xl text-red-500"
        aria-hidden="true"
      ></span>
      <span
        :class="`font-muli font-semibold ml-2 ${
          this.post.meta.actions.loved === 0 ? 'text-white' : 'text-red-500'
        }`"
        >{{ sanitizeNumber(post.footer.action_map.love) }}</span
      >
    </button>

    <!-- View -->
    <button class="w-auto ml-4 focus:outline-none px-2 py-0">
      <span
        v-if="this.post.meta.actions.viewed === 0"
        class="fa fa-dot-circle-o text-2xl text-white"
        aria-hidden="true"
      ></span>
      <span
        v-else
        class="fa fa-dot-circle-o text-2xl text-purple-600"
        aria-hidden="true"
      ></span>
      <span
        :class="`font-muli font-semibold ml-2 ${
          this.post.meta.actions.viewed === 0 ? 'text-white' : 'text-purple-600'
        }`"
        >{{ sanitizeNumber(post.footer.action_map.view) }}</span
      >
    </button>

    <!-- Share -->
    <button  @click="bindAction('share')" class="w-auto ml-4 focus:outline-none px-2 py-0">
      <span
        v-if="this.post.meta.actions.shared === 0"
        class="fa fa-share text-2xl text-white"
        aria-hidden="true"
      ></span>
      <span
        v-else
        class="fa fa-share text-2xl text-blue-500"
        aria-hidden="true"
      ></span>
      <span
        :class="`font-muli font-semibold ml-2 ${
          this.post.meta.actions.shared === 0 ? 'text-white' : 'text-blue-500'
        }`"
        >{{ sanitizeNumber(post.footer.action_map.love) }}</span
      >
    </button>

    <!-- Comment -->
    <button class="w-auto ml-4 focus:outline-none px-2 py-2" @click="navigateOnePost()">
      <span aria-hidden="true" class="material-icons text-2xl text-white"
        >comment</span
      >
      <span class="text-white ml-2 font-muli font-semibold">{{sanitizeNumber(post.footer.action_map.comment)}}</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { PropOptions } from 'vue/types/umd'
import { OnePost } from '~/types'
export default Vue.extend({
  mounted(){
    if(this.post.meta.actions.viewed === 0){
      this.bindAction('view')
    }
  },
  props: {
    post: {} as PropOptions<OnePost>,
  },
  methods: {
    ...mapActions('post/post_actions', ['microActionPost']),
    ...mapMutations('discover', ['updatePostAction']),
    sanitizeNumber(num?: number): string | number | undefined {
      if (num != undefined && num >= 1000) {
        return num.toFixed(2) + 'K'
      }
      return num
    },
    bindAction(action: string): void {
      let self = this
      this.microActionPost({
        action: action,
        pid: self.post.post_id,
        action_complete: function (payllad: any) {
          self.updatePostAction({ action: action, pid: self.post.post_id })
        },
      })
    },

    navigateOnePost():void {
      this.$router.push(`/post/${this.post.post_id}`)
    }
  },
})
</script>