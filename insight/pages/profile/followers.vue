<template>
  <div
    class="w-full h-full flex flex-col pt-2 pb-16 overflow-hidden bg-white"
    style="min-height:90vh;"
  >
    <!-- Header -->
    <div class="w-full h-16 pt-2 flex">
      <span @click="$router.go(-1)" class="material-icons text-2xl"
        >keyboard_arrow_left</span
      >
      <div class="w-full h-full flex justify-center">
        <p class="font-muli text-lg font-bold text-green-400">Followers</p>
      </div>
    </div>
    <div class="w-full h-auto overflow-y-scroll flex flex-col px-2">
      <div v-for="follower in followers" :key="follower.account_id">
        <follow-card :account="follower" :unfollow="false" />
      </div>
    </div>
  </div>
</template>

<script>
import FollowCard from '@/components/profile/FollowCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    FollowCard
  },
  data() {
    return {}
  },
  mounted() {
    this.fetchFollows('followers')
    // this.avatar = this.account.avatar;
    // this.usename = this.account.username;
  },
  computed: {
    ...mapState('profile/follows', ['followers', 'loading'])
  },
  methods: {
    ...mapActions('profile/follows', ['fetchFollows'])
  }
}
</script>
