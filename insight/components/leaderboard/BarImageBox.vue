<template>
  <div class="w-full relative flex px-4 justify-between">
    <div class="w-24 h-full">
    <div
      v-if="this.user2 != undefined && this.user2.account != undefined"
      class="w-24 h-full px-2 flex flex-col mt-4"
      @click="jumpToUser(user2)"
    >
      <p class="w-full text-center font-lato font-bold text-lg">2</p>
      <ImageBox
        
        :src="this.user2.account.avatar"
        class="w-20 mt-2 h-20 rounded-full"
      />
      <p class="mt-1 font-lato font-bold truncate">{{ user2.account.name }}</p>
      <p class="font-muli text-sm text-center truncate text-gray-700">
        @{{ user2.account.username }}
      </p>
      <div class="w-full flex">
        <span :class="`material-icons ${scoreIconColor(user2)}`">{{ scoreIcon(user2) }}</span>
        <p class="font-lato font-bold text-base ml-2">
          {{ getScore(user2) }}
        </p>
      </div>
    </div>
    </div>
    
    <div class="w-32 h-full">
    <div
      v-if="this.user1 != undefined && this.user1.account != undefined"
      class="w-32 h-full justify-between px-2 flex flex-col"
      @click="jumpToUser(user1)"
    >
      <!-- <p class="w-full text-center font-lato font-bold text-lg">1</p> -->
      <div class="w-full flex justify-start">
        <img src="@/assets/svg/crown.svg" class="image w-8 h-8" /></div>
      <ImageBox
        
        :src="this.user1.account.avatar"
        class="w-24 h-24 rounded-full"
      />
      <p class="mt-1 font-lato font-bold truncate">{{ user1.account.name }}</p>
      <p class="font-muli text-sm text-center truncate text-gray-700">
        @{{ user1.account.username }}
      </p>
      <div class="w-full flex">
        <span :class="`material-icons ${scoreIconColor(user1)}`">{{ scoreIcon(user1) }}</span>
        <p class="font-lato font-bold text-base ml-2">
          {{ getScore(user1) }}
        </p>
      </div>
    </div>
    </div>
    
    <div class="w-24 h-full">
    <div
      v-if="this.user3 != undefined && this.user3.account != undefined"
      class="w-24 h-full justify-between px-2 flex flex-col mt-4"
      @click="jumpToUser(user3)"
    >
      <p class="w-full text-center font-lato font-bold text-lg">3</p>
      <ImageBox
        
        :src="this.user3.account.avatar"
        class="w-20 mt-2 h-20 rounded-full"
      />

      <p class="mt-1 font-lato font-bold truncate">{{ user3.account.name }}</p>
      <p class="font-muli text-sm text-center truncate text-gray-700">
        @{{ user3.account.username }}
      </p>
      <div class="w-full flex">
        <span :class="`material-icons ${scoreIconColor(user3)}`">{{ scoreIcon(user3) }}</span>
        <p class="font-lato font-bold text-base ml-2">
          {{ getScore(user3) }}
        </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { RankCard } from '@/types/index'
import ImageBox from '@/components/util/ImageBox.vue'

export default Vue.extend({
  props: {
    user1: {} as PropOptions<RankCard>,
    user2: {} as PropOptions<RankCard>,
    user3: {} as PropOptions<RankCard>,
  },
  components: {
    ImageBox,
  },
  computed: {
    

  },
  methods: {
    jumpToUser(user: RankCard): void {
      this.$router.push(`/profile/${user.account.username}`)
    },
    getScore(user: RankCard): string {
      if(user.sort === 'loves' || user.sort === 'views'){
        return this.sanitizeScore(user.score)
      }
      else if (user.score < 1) {
        return user.score.toFixed(4)
      }
      return this.sanitizeScore(user.score)
    },
    sanitizeScore(num: number): string {
      if( num >= 1000){
        return (num/1000).toFixed(2) + 'K'
      }
      return num.toString()
    },
    scoreIcon(user: RankCard): string {
      if (user.sort === 'loves') {
        return 'favorite'
      } else if (user.sort === 'views') {
        return 'adjust'
      }
      return 'offline_bolt'
    },
    scoreIconColor(user: RankCard): string {
      if (user.sort === 'loves') {
        return 'text-red-500'
      } else if (user.sort === 'views') {
        return 'text-purple-600'
      }
      return 'text-yellow-500'
    },
  },
})
</script>

<style scoped>
.bg-white-85 {
  background: rgba(255, 255, 255, 0.85);
}

.image {
  transform: rotate(-20deg);
}
</style>