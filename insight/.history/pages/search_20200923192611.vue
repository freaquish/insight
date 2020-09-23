<template>
  <div class="w-full h-full grided bg-tint-purple">
    <div class="w-full fixed flex pt-4 px-2">
      <span class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
      <div class="w-full h-full flex flex-row-reverse">
        <span
          @click="onClickSearch()"
          class="material-icons stroke-current text-white"
          >search</span
        >
        <transition name="slide-fade">
          <input
            v-if="this.showSearchInput"
            class="w-full ml-6 mr-4 py-1 rounded-md focus:outline-none text-white font-muli bg-tint-purple-shallow placeholder-white px-2"
            placeholder="Type name, hobby or tag..."
            v-model="searchText"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      showSearchInput: false as boolean,
      searchText: undefined as string | undefined
    }
  },
  methods: {
    ...mapMutations("search",['followedUser']),
    ...mapActions("search",['search'])
    onClickSearch(): void {
      if (this.searchText === undefined && this.showSearchInput === false) {
        this.showSearchInput = true
      }
    }
  }
})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 5vh 90vh;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
