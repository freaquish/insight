<template>
  <div class="w-full pb-10 h-full flex flex-col">
    <!-- Heaer -->
    <div class="w-full flex flex-col pt-2 pb-0 fixed z-10 shadow-sm bg-white">
      <div class="px-2 flex overflow-hidden">
        <span @click="navBack" class="material-icons">keyboard_backspace</span>
        <div class="w-full flex justify-center">
          <p class="font-lato font-semibold text-2xl">Discover</p>
        </div>
        <!-- <span @click="reload" class="material-icons mr-2">replay</span> -->
      </div>
      <div class="w-full flex py-2 px-4 overflow-x-scroll">
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

    <!-- Body -->
    <div class="w-full h-full px-4 pt-32 pb-10 randogrid-container">
      <div class="w-full h-full randogrid-box px-2 py-1">
        <div v-for="(post, index) in posts" :key="index">
          <div v-if="index % 2 === 0">
            <DiscoverPostBox :post="post" :index="index" />
          </div>
        </div>
      </div>

       <div class="w-full h-full randogrid-box">
        <div v-for="(post,index) in posts" :key="index">
          <div v-if="index % 2 != 0">
            <DiscoverPostBox :post="post" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import HobbyTab from '@/components/leaderboard/HobbyTab.vue'
import DiscoverPostBox from '@/components/discover/DiscoverPostBox.vue'
import { Hobby } from '~/types'
export default Vue.extend({
  mounted() {
    this.fetchDiscover({})
  },
  components: {
    HobbyTab,
    DiscoverPostBox,
  },
  data() {
    return {
      all: {
        code_name: 'all',
        name: 'All',
      } as Hobby,
      expandedMode: false as boolean
    }
  },
  computed: {
    ...mapState('discover', ['hobbies', 'selected', 'posts','scrollPostition']),
  },
  methods: {
    ...mapActions('discover', ['fetchDiscover']),
    ...mapMutations('discover', ['setScrollPosition' , 'resetNextLink', 'reset']),
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
    showExpandedPosts(postId: string): void {
        this.expandedMode = true
        this.setScrollPosition(window.pageYOffset)
        let elem = this.$el.querySelector(`#${postId}`)
        if(elem != null){
            elem.scrollIntoView({behavior: "smooth", block: "center"})
        }
    },
    navBack(): void {
        if(this.expandedMode){
            this.expandedMode = false
            if(this.scrollPostition != undefined && this.scrollPostition > 0){
                window.scrollTo(0, this.scrollPostition)
            }
        }else{
            this.reset()
            this.$router.go(-1)
        }
    },
    reload(): void {
        // Proposal to reload data 
        this.resetNextLink()
        this.fetchDiscover({})
    }
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