<template>
  <div class="w-full h-full ">
    <!-- Main Profile Body -->
    <div class="w-full h-full flex flex-col py-2 px-2">
      <div class="w-full h-10 flex">
        <span @click="navback" class="material-icons">keyboard_backspace</span>
      </div>
      
      <!-- Head -->
      <HeadCard :associationbtn="showAssociationButtons" :followbtn="showFollowButton" 
      :avatar="avatar" :username="username" :followers="followers" :following="following" />
      
      <!-- Tabs -->
      <div class="w-full h-auto mt-2 px-4 flex ">
        <div v-for="tab in tabs" :key="tab" class="border border-gray-400 border-t-0 border-l-0 border-r-0">
          <div @click="onClickTab(tab)" :class="`px-2 mx-1 py-2 font-muli font-semibold border-purple-600 ${(currentTab === tab)? 'border-2 border-t-0 border-r-0 border-l-0': 'border-0'}`">{{tab}}</div>
        </div>
      </div>

      <!-- Body -->
      <div class="w-full h-full">
        <div v-if="this.currentTab === 'About'">
          <AboutBox :editable="editable" :hobbies="hobbies" :propName="`${firstName} ${lastName}`" :propDescription="description" />
        </div>
        <div v-else-if="this.currentTab === 'Posts'">
          <PostComponent :collections="collections" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import HeadCard from "@/components/profile/HeadCard.vue"
import AboutBox from "@/components/profile/AboutBox.vue"
import PostComponent from "@/components/profile/PostsComponent.vue"
export default Vue.extend({
  mounted() {
    this.fetchProfile(() => {})
  },
  components: {
      HeadCard,
      AboutBox,
      PostComponent
  },
  computed: {
    ...mapState('profile/profile', [
      'collections',
      'hobbies',
      'editable',
      'following',
      'followers',
      'avatar',
      'firstName',
      'description',
      'lastName',
      'username',
      'loading',
      'isFollowing'
    ]),

    showAssociationButtons(): boolean {
      if (this.editable) return false
      return true
    },
    showFollowButton(): boolean {
      if (this.showAssociationButtons && !this.isFollowing) return true
      return false
    },
  },
  data() {
    return {
      currentTab: 'About' as string,
      tabs: ['About', 'Posts'] as string[]
    }
  },
  methods: {
    ...mapActions('profile/profile', ['fetchProfile','updateProfileData','fetchUserPost']),
    ...mapMutations('profile/profile', ['setEditability', 'reset']),
    navback(): void {
      this.reset()
      this.$router.go(-1)
    },

    onClickTab(tab: string): void {
      this.currentTab = tab
      this.triggerTabChange()
    },
    changeProfile(data:{first_name: string, last_name: string, description: string}):void {
      if(this.editable){
        this.updateProfileData(data)
      }
    },
    triggerTabChange(): void {
      switch(this.currentTab){
        case "Posts":
          if(this.collections.length === 0){
            this.extractPosts()
          }
          break
      }
    },
    extractPosts():void {
      this.fetchUserPost(this.username)
    }
    
  }
})
</script>