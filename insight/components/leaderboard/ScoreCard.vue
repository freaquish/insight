<template>
  <div
    @click="onCardClick"
    :data-self="user.isSelf === 1 ? true : false"
    :class="`${
      containerOverflown ? bgColor : 'bg-transparent'
    } w-full my-2 px-4 h-auto flex xs:text-sm`"
  >
    <p class="font-muli font-semibold text-black block my-auto text-lg h-full">
      {{ user.rank }}
    </p>
    <div
      class="w-full ml-2 pt-4 pb-4 pr-6 pl-1 h-full flex rounded-full bg-white shadow-xl"
    >
      <ImageBox
        :src="user.account.avatar"
        class="w-12 ml-4 h-12 rounded-full"
      />
      <div class="w-full flex justify-between">
      <div class="w-auto h-full flex flex-col ml-6">
        <p class="font-muli font-semibold truncate text-gray-900">
          {{ user.account.name }}
        </p>
        <p class="text-sm truncate text-blue-700">@{{ user.account.username }}</p>
      </div>
      <div v-if="this.showingIcon" class="inline-block my-auto font-semibold">
        <p class="flex">
          <span :class="`material-icons mr-1 ${scoreIconColor(user)}`">{{scoreIcon(user)}}</span
          >{{ getScore }}
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
  components: {
    ImageBox,
  },
  computed: {
    bgColor(): string {
      return this.user.isSelf === 1 ? 'pink-grad' : 'bg-transparent'
    },
    getScore(): string {
      if(this.user.score < 1) return this.user.score.toFixed(3)
      return this.user.score.toFixed(1)
    },
    showingIcon(): boolean{
      return (this.user.sort === 'loves' || this.user.sort === 'views')
    }
  },
  props: {
    user: {} as PropOptions<RankCard>,
    containerOverflown: false as PropOptions<boolean>,
  },
  methods: {
    onCardClick(): void {
      this.$router.push(`/profile/${this.user.account.username}`)
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
.pink-grad {
  background: linear-gradient(
      89.9deg,
      rgba(252, 8, 67, 0.31) 10.28%,
      rgba(255, 255, 255, 0) 99.9%
    ),
    rgba(253, 253, 253, 0.82);
  background-color: white;
}
</style>