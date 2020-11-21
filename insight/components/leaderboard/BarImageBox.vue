<template>
  <div class="w-full relative flex">
    <div v-if="this.user2 != undefined && this.user2.account != undefined" 
    style="left:0.875rem; top:6.825rem;"
    class="absolute z-10">
      <ImageBox
        @click="jumpToUser(user2)"
        :src="this.user2.account.avatar"
        class="rounded-full px-2 py-2 bg-white-85"
        style="width: 7rem; height: 7rem"
      />
      <!-- <p class="font-muli text-white font-semibold text-base">{{this.user2.name}}</p> -->
    </div>
    <div v-if="this.user1 != undefined && this.user1.account != undefined"
     style="left: 9.375rem; top:3.125rem;"
     class="absolute">
      <ImageBox
      @click="jumpToUser(use1)"
        :src="this.user1.account.avatar"
        class="rounded-full px-2 py-2 bg-white-85"
        style="width: 7rem; height: 7rem"
      />
      <!-- <p class="font-muli text-white font-semibold text-base">{{this.user1.account.name}}</p> -->
    </div>
    <div v-if="this.user3 != undefined && this.user3.account != undefined" 
    style="left: 18.34375rem; top: 8.625rem;"
    class="absolute">
      <ImageBox
      @click="jumpToUser(user3)"
        :src="this.user3.account.avatar"
        class="rounded-full px-2 py-2 bg-white-85"
        style="width: 7rem; height: 7rem"
      />
      <!-- <p class="font-muli text-white font-semibold text-base">{{this.user3.name}}</p> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import {RankCard} from '@/types/index'
import ImageBox from '@/components/util/ImageBox.vue'

export default Vue.extend({
    props: {
      user1: {} as PropOptions<RankCard>,
      user2: {} as PropOptions<RankCard>,
      user3: {} as PropOptions<RankCard>
    },
    components: {
      ImageBox
    },
    methods:{
      jumpToUser(user: RankCard):void {
        this.$router.push(`/profile/${user.account.username}`)
      }
    }
})
</script>

<style scoped>
.bg-white-85 {
  background: rgba(255, 255, 255, 0.85);
}
</style>