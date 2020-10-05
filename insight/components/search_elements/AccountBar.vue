<template>
  <div class="accbar w-auto mx-2 mb-2 h-auto flex px-2 py-2 shadow-md rounded-lg overflow-hidden">
    <div style="width:13%;height:13%">
      <img @click="navigation()" :src="getAvatar" class="w-10 h-10 rounded-full"/>
    </div>
    <div class="h-full flex flex-col overflow-hidden px-4" style="width:67%;">
      <p @click="navigation()" class="font-montserrat text-sm text-blue-500">
        {{ user.username }}
      </p>
      <p @click="navigation()" class="font-muli font-bold text-black">
        {{ user.name }}
      </p>
    </div>
    <div class="h-auto mt-2" style="width:20%;">
        <button
          v-if="this.user.following === 0"
          @click="onClickFollow()"
          class="px-2 py-1 bg-blue-600 text-white font-semibold text-sm font-montserrat rounded-md"
        >
          Follow
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from '@/types/index'
import { avatarDefault } from '@/static/js/assets'
import { mapActions, mapMutations } from 'vuex'
export default Vue.extend({
  props: {
    user: {} as PropOptions<User>
  },
  computed: {
    getAvatar(): string {
      if (this.user.avatar != undefined && this.user.avatar.length > 0) {
        return this.user.avatar
      }
      return avatarDefault
    }
  },
  methods: {
    ...mapMutations('search', ['followedUser']),
    ...mapActions('profile/follows', ['followactions']),
    navigation(): void {
      this.$router.push(`/profile/${this.user.username}`)
    },
    onClickFollow(): void {
      console.log('hello')

      this.followactions({
        aid: this.user.account_id,
        onComplete: () => {
          this.followedUser(this.user.account_id)
        }
      })
    }
  }
})
</script>


<style scoped>
.accbar {
  background: linear-gradient(16.1deg, rgba(0, 0, 0, 0) 0%, rgba(157, 170, 224, 0.51) 100%);
}
</style>