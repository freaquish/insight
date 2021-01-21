<template>
  <div class="w-auto mx-2 relative mb-3 h-auto flex px-2 py-4 bg-white shadow-xl rounded-lg">
    <img @click="navigation()" :src="getAvatar" class="w-16 h-16 mt-1 rounded-md shadow-lg" />
    <div class="w-full ml-6 h-full flex flex-col">
      <p @click="navigation()" class="font-muli font-bold text-lg truncate">
        {{ user.name }}
      </p>
      <p @click="navigation()" class="font-montserrat truncate font-bold text-xs text-blue-600">
        @{{ user.username }}
      </p>
      
    </div>
    <div class="w-auto h-auto mt-2" >
        <button
          v-if="this.user.following === 0"
          @click="onClickFollow()"
          class="px-4 py-2 bg-green-600 text-white font-bold text font-muli rounded-md"
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
