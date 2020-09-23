<template>
  <div class="w-full h-auto flex px-2 py-2 bg-tint-purple-shallow">
    <img :src=""
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
