<template>
  <div class="w-full flex flex-col px-4 py-2 mt-2">
    <img class="w-20 h-20 rounded-lg" :src="avatar" @click="$emit('launchimv')" />
    <div class="w-full h-full flex flex-col mt-4">
      <p class="font-lato text-blue-900 font-bold text-2xl">
        {{ username }}
      </p>
      <p class="font-muli text-base mx-1 pr-2 flex ">
        <span @click="$emit('assoctap','followers')"
          >Followers
          <span class="font-semibold">{{ metric(followers) }}</span></span
        >
        <span class="ml-4" @click="$emit('assoctap','followings')"
          >Following
          <span class="font-semibold">{{ metric(following) }}</span></span
        >
      </p>
      <div class="w-full h-auto" v-if="this.associationbtn">
        <button
          v-if="this.followbtn"
          @click="associationClicked()"
          class="w-full mt-4 rounded-md h-8 font-semibold font-muli text-white bg-purple-600"
        >
          Follow
        </button>

        <button
          v-else
          @click="associationClicked()"
          class="w-full mt-4 h-8 rounded-md font-semibold font-muli bg-gray-300 text-gray-800"
        >
          Unfollow
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {mapState, mapActions, mapMutations} from "vuex"
export default Vue.extend({
  props: {
    avatar: '' as PropOptions<string>,
    username: '' as PropOptions<string>,
    followers: 0 as PropOptions<number>,
    following: 0 as PropOptions<number>,
    associationbtn: true as PropOptions<boolean>,
    followbtn: true as PropOptions<boolean>
  },
  computed:{
    ...mapState('profile/profile', ['account_id'])
  },
  methods: {
    ...mapActions('profile/follows', ['followactions']),
    ...mapMutations('profile/profile', ['alterFollowing']),
    metric(count: number): string {
      if (count >= 1000) {
        return (count / 1000).toFixed(2) + 'K'
      }
      return `${count}`
    },
    associationClicked(): void {
      let self = this
      this.followactions({
        aid: self.account_id,
        onComplete: function(){
          self.alterFollowing()
        }
      })
    }
  }
})
</script>