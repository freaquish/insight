<template>
  <div class="w-full mb-1 h-auto flex px-2 py-2 bg-tint-purple-shallow">
    <img :src="getAvatar" class="w-10 h-10 rounded-lg" />
    <div class="w-auto ml-4 h-full flex flex-col">
      <p class="font-montserrat text-sm text-blue-500">{{ user.username }}</p>
      <p class="font-muli font-bold text-white">{{ user.name }}</p>
      <div class="w-full h-auto flex mt-2">
        <button
          v-if="this.user.following === 0"
          class="px-2 py-1 bg-green-400 text-white font-montserrat"
        >
          Follow
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from '@/types/index'
import { avatarDefault } from '@/static/js/assets'
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
  }
})
</script>
