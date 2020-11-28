<template>
  <div :class="`w-full h-full ${expandedMode ? 'fixed' : ''}`">
    <div class="w-full pb-10 h-full flex flex-col overflow-hidden">
      <!-- Heaer -->
      <div
        class="w-full h-auto flex flex-col pt-2 pb-0 z-10 fixed shadow-sm bg-white"
      >
        <div class="px-2 flex overflow-hidden">
          <span @click="navBack" class="material-icons"
            >keyboard_backspace</span
          >
          <div class="w-full flex justify-center">
            <p class="font-lato font-semibold text-2xl">Discover</p>
          </div>
          <!-- <span @click="reload" class="material-icons mr-2">replay</span> -->
        </div>
        <div
          v-if="!this.expandedMode"
          class="w-full flex py-2 px-4 overflow-x-scroll"
        >
          <HobbyTab
            :hobby="all"
            :active="selected === undefined || selected.code_name === 'all'"
            @click="onHobbyTabClick"
          />
          <div v-for="hobby in hobbies" :key="hobby.code_name">
            <HobbyTab
              :hobby="hobby"
              :active="isHobbyTabActive(hobby)"
              @click="onHobbyTabClick"
            />
          </div>
        </div>
      </div>

      <!-- Body Contracted Mode -->
      <div
        v-if="!this.expandedMode"
        class="w-full h-full px-4 pt-32 pb-10 randogrid-container"
      >
        <div class="w-full h-full randogrid-box px-2 py-1">
          <div v-for="(post, index) in posts" :key="index">
            <div v-if="index % 2 === 0">
              <DiscoverPostBox
                @select="clickedPost"
                :post="post"
                :index="index"
              />
            </div>
          </div>
        </div>

        <div class="w-full h-full randogrid-box">
          <div v-for="(post, index) in posts" :key="index">
            <div v-if="index % 2 != 0">
              <DiscoverPostBox
                @select="clickedPost"
                :post="post"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Body Expanded Mode -->
      <div
        v-if="this.expandedMode && this.posts.length > 0"
        class="w-full h-full flex flex-col pt-8 pb-10"
      >
        <!-- <div v-for="(post,index) in posts" :key="index"> -->
        <DiscoverExtractedPostBox
          @next="slideNext"
          @prev="slidePrevious"
          :post="currentPost"
          :index="currentIndex"
        />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import HobbyTab from '@/components/leaderboard/HobbyTab.vue'
import DiscoverPostBox from '@/components/discover/DiscoverPostBox.vue'
import DiscoverExtractedPostBox from '@/components/discover/DiscoverExtractedPostBox.vue'
import { Hobby, OnePost } from '~/types'

export default Vue.extend({
  mounted() {
    this.fetchDiscover({})
  },
  components: {
    HobbyTab,
    DiscoverPostBox,
    DiscoverExtractedPostBox,
  },
  data() {
    return {
      all: {
        code_name: 'all',
        name: 'All',
      } as Hobby,
      expandedMode: false as boolean,
      currentIndex: 0 as number,
    }
  },
  computed: {
    ...mapState('discover', [
      'hobbies',
      'selected',
      'posts',
      'scrollPostition',
    ]),
    currentPost(): OnePost {
      return this.posts[this.currentIndex]
    },
  },
  methods: {
    ...mapActions('discover', ['fetchDiscover']),
    ...mapMutations('discover', [
      'setScrollPosition',
      'resetNextLink',
      'reset',
    ]),
    isHobbyTabActive(hobby: Hobby): boolean {
      return (
        this.selected != undefined &&
        this.selected.code_name === hobby.code_name
      )
    },
    onHobbyTabClick(hobby: Hobby): void {
      let elem = this.$el.querySelector(
        `#${hobby.code_name}`
      ) as HTMLDivElement | null
      if (elem != null) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
      this.fetchDiscover({ hobby: hobby })
    },
    setExpandedPosts(): void {
      this.expandedMode = true
      this.setScrollPosition(this.posts[this.currentIndex].post_id)
    },
    navBack(): void {
      if (this.expandedMode) {
        this.expandedMode = false
        if (this.scrollPostition != undefined) {
          this.$nextTick().then(() => {
            let id = '#' + this.scrollPostition
            let elem = this.$el.querySelector(id) as HTMLDivElement | null
            if (elem != null) {
              elem.scrollIntoView({ block: 'center' })
            }
          })
        }
      } else {
        this.reset()
        this.$router.go(-1)
      }
    },
    reload(): void {
      // Proposal to reload data
      this.resetNextLink()
      this.fetchDiscover({})
    },

    slideNext(index: number): void {
      if (this.posts.length - 1 > index) {
        this.currentIndex = index + 1
      }
    },

    slidePrevious(index: number): void {
      if (index > 0) {
        this.currentIndex = index - 1
      } else {
        this.currentIndex = 0
      }
    },
    clickedPost(index: number): void {
      this.currentIndex = index
      this.setExpandedPosts()
      this.expandedMode = true
    },
  },
})
</script>

<style scoped>
.randogrid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-x: hidden;
  overflow-y: scroll;
}

.randogrid-box {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>