<template>
  <div
    :class="`w-full pt-2 pb-2 px-2 flex-col fixed z-30 text-black  ${
      isScoreCardOverflowed ? 'bg-white shadow-xl' : 'bg-transparent'
    }`"
  >
    <div class="w-full flex">
      <span
      @click="$router.go(-1)"
        :class="`material-icons ${
          isScoreCardOverflowed ? 'text-black' : 'text-black'
        } text-3xl`"
        >keyboard_backspace</span
      >
      <div class="w-full flex flex-row-reverse justify-between">
        <span
          @click="hamOptionClicked"
          :class="`material-icons  ${
            isScoreCardOverflowed ? 'text-black' : 'text-black'
          } text-3xl px-2`"
        >
          menu
        </span>
        <!-- <span @click="searchClick" :class="`material-icons  ${isScoreCardOverflowed? 'text-black': 'text-white'} text-3xl px-2`"> search </span>
        <input v-show="this.isSearchVisible" placeholder="Search.."
         v-model="searchText"
         :class="`w-full  font-muli px-2 py-1 ml-2 bg-transparent ${isScoreCardOverflowed? 'text--black placeholder-black': 'text-white placeholder-white'} focus:outline-none`" /> -->
      </div>
    </div>

    <div class="w-full flex overflow-x-scroll py-2">
      <HobbyTab
        :isScoreContainerOverflown="isScoreCardOverflowed"
        @click="hobbyClicked"
        :hobby="allHobbyTab"
        :active="selected === undefined || selected.code_name === 'all'"
      />
      <div v-for="hobby in hobbies" :key="hobby.code_name">
        <HobbyTab
          :isScoreContainerOverflown="isScoreCardOverflowed"
          @click="hobbyClicked"
          :hobby="hobby"
          :active="selected === hobby"
        />
      </div>
    </div>
    <div class="w-full sticky flex flex-row-reverse">
      <button @click="$emit('scroll-self')" v-if="this.isScoreCardOverflowed" class="pl-3 pr-4 bg-pink-600 pt-2 rounded-l-full">
        <span class="material-icons text-white"> gps_fixed </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import HobbyTab from '@/components/leaderboard/HobbyTab.vue'
import { Hobby } from '~/types'
export default Vue.extend({
  props: ['activeHobby', 'isScoreCardOverflowed'],
  data() {
    return {
      isSearchVisible: false,
      searchText: '',
      allHobbyTab: {
        code_name: 'all',
        name: 'All',
      },
    }
  },
  components: {
    HobbyTab,
  },
  updated() {
    if (this.selected != undefined) {
      let elem = this.$el.querySelector(`#${this.selected.code_name}`)
      if (elem != undefined) {
        elem.scrollIntoView()
      }
    }
  },
  computed: {
    ...mapState('leaderboard', ['hobbies', 'selected']),
  },
  methods: {
    ...mapActions('leaderboard', ['fetchLeaderboard']),
    showSearchBox(): void {
      this.isSearchVisible = true
    },
    requestSearch(): void {
      this.fetchLeaderboard({ search: this.searchText })
    },
    searchClick(): void {
      if (!this.isSearchVisible) {
        this.showSearchBox()
      } else {
        if (this.searchText.length > 0) {
          this.requestSearch()
        }
      }
    },
    hamOptionClicked(): void {
      this.$emit('hamclick')
    },
    hobbyClicked(hobby: Hobby): void {
      this.fetchLeaderboard({
        hobbies: [hobby],
      })
    },
    
  },
})
</script>