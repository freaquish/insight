<template>
  <div class="w-full h-full ">
    <!-- Image Viewer -->
    <ImageViewer
      :active="showImageViewer"
      :src="avatar"
      :edit="editable"
      @stateLoading="updateLoadingState"
      @revert="toggleImageViewer"
    />

    <!-- Main Profile Body -->
    <div
      v-if="!this.showImageViewer"
      class="w-full h-full flex flex-col py-2 px-2"
    >
      <div class="w-full h-10 flex">
        <span @click="navback" class="material-icons">keyboard_backspace</span>
      </div>

      <!-- Head -->
      <HeadCard
        :associationbtn="showAssociationButtons"
        :followbtn="showFollowButton"
        @launchimv="toggleImageViewer(true)"
        :avatar="avatar"
        :username="username"
        :followers="followers"
        :following="following"
        @assoctap="navigatetoAssociation"
      />

      <!-- Tabs -->
      <div class="w-full h-auto mt-2 px-4 flex ">
        <div
          v-for="tab in tabs"
          :key="tab"
          class="border-0 border-gray-400 border-t-0 border-l-0 border-r-0"
        >
          <div
            @click="onClickTab(tab)"
            :class="
              `px-2 mx-1 py-2 text-lg font-muli font-semibold border-purple-600 ${
                currentTab === tab
                  ? 'border-4 border-t-0 border-r-0 border-l-0'
                  : 'border-0'
              }`
            "
          >
            {{ tab }}
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="w-full h-full pb-16">
        <div
          v-if="
            this.currentTab === 'About' && !this.fullName.includes('undefined')
          "
        >
          <AboutBox
            :editable="editable"
            :hobbies="hobbies"
            :propName="fullName"
            :propDescription="renderedDescription"
            @change="changeProfile"
          />
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import HeadCard from '@/components/profile/HeadCard.vue'
import AboutBox from '@/components/profile/AboutBox.vue'
import PostComponent from '@/components/profile/PostsComponent.vue'
import ImageViewer from '@/components/profile/ImageViewer.vue'

export default Vue.extend({
  asyncData({ params }) {
    return { isSelf: params.self === 'self', arg: params.self }
  },

  mounted() {
    if (this.$data.isSelf) {
      this.fetchProfile(() => {})
    } else {
      this.fetchThirdProfile({ aid: this.$data.arg, func: () => {} })
    }
  },
  components: {
    HeadCard,
    AboutBox,
    PostComponent,
    ImageViewer
  },
  computed: {
    ...mapState('profile/profile', [
      'collections',
      'hobbies',
      'editable',
      'following',
      'followers',
      'avatar',
      'username',
      'loading',
      'isFollowing',
    ]),
    ...mapGetters('profile/profile', ['fullName', 'renderedDescription']),
    showAssociationButtons(): boolean {
      if (this.editable) return false
      return true
    },
    showFollowButton(): boolean {
      if (this.showAssociationButtons && !this.isFollowing) return true
      return false
    }
  },
  data() {
    return {
      currentTab: 'About' as string,
      tabs: ['About', 'Posts'] as string[],
      showImageViewer: false as boolean
    }
  },
  methods: {
    ...mapActions('profile/profile', [
      'fetchProfile',
      'updateProfileData',
      'fetchUserPost',
      'fetchThirdProfile'
    ]),
    ...mapMutations('profile/profile', [
      'setEditability',
      'reset',
      'setLoadingState'
    ]),
    ...mapMutations('profile/follows', ['setAccount', 'resetFollows']),
    navback(): void {
      this.reset()
      this.resetFollows()
      this.$router.go(-1)
    },

    onClickTab(tab: string): void {
      this.currentTab = tab
      this.triggerTabChange()
    },
    changeProfile(data: {
      first_name: string
      last_name: string
      description: string
    }): void {
      if (this.editable) {
        this.updateProfileData(data)
      }
    },
    triggerTabChange(): void {
      switch (this.currentTab) {
        case 'Posts':
          if (this.collections.length === 0) {
            this.extractPosts()
          }
          break
      }
    },
    extractPosts(): void {
      this.fetchUserPost(this.username)
    },
    updateLoadingState(val: boolean): void {
      this.setLoadingState(val)
    },
    toggleImageViewer(value: boolean): void {
      this.showImageViewer = value
    },
    navigatetoAssociation(link: string): void {
      if (!this.$data.isSelf) {
        this.setAccount(this.username)
      } else {
        this.setAccount(undefined)
      }
      this.$router.push(`/profile/${link}`)
    }
  }
})
</script>