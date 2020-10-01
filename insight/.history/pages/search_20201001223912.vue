<template>
  <div class="w-full h-full grided bg-tint-purple">
    <!-- Header -->
    <div class="w-full fixed flex flex-col pt-4 px-2 bg-tint-purple">
      <div class="w-full flex">
        <span @click="goBack()" class="material-icons stroke-current text-white"
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
              @input="onInput()"
            />
          </transition>
        </div>
      </div>
      <div class="w-full h-auto flex">
        <SearchTab
          :text="'All'"
          :active="selectedTab === 'All'"
          @tabbed="selectTab"
        />
        <SearchTab
          :text="'Tag'"
          :active="selectedTab === 'Tag'"
          @tabbed="selectTab"
        />
        <SearchTab
          :text="'User'"
          :active="selectedTab === 'User'"
          @tabbed="selectTab"
        />
        <SearchTab
          :text="'Hobby'"
          :active="selectedTab === 'Hobby'"
          @tabbed="selectTab"
        />
      </div>
    </div>

    <!-- Body -->
    <div
      class="w-full overflow-y-scroll flex flex-col pb-16"
      style="margin-top:14vh;height:82vh;"
    >
      <div v-if="this.isTabActive('Tag')">
        <div v-for="tag in tags" :key="tag.tag">
          <TagBar :tag="tag" />
        </div>
      </div>

      <div v-if="this.isTabActive('Hobby')">
        <div v-for="hobby in hobbies" :key="hobby.code_name">
          <HobbyBar :hobby="hobby" />
        </div>
      </div>

      <div v-if="this.isTabActive('User')">
        <div v-for="user in users" :key="user.account_id">
          <AccountBar :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import TagBar from '@/components/search_elements/TagBar.vue'
import HobbyBar from '@/components/search_elements/HobbyBar.vue'
import AccountBar from '@/components/search_elements/AccountBar.vue'
import SearchTab from '@/components/search_elements/SearchTab.vue'

export default Vue.extend({
  components: {
    TagBar,
    HobbyBar,
    AccountBar,
    SearchTab
  },
  data() {
    return {
      showSearchInput: false as boolean,
      searchText: undefined as string | undefined,
      selectedTab: 'All' as string
    }
  },
  computed: {
    ...mapState('search', ['tags', 'users', 'hobbies'])
  },
  methods: {
    ...mapActions('search', ['search']),
    ...mapMutations('search', ['clear']),
    onClickSearch(): void {
      if (this.searchText === undefined && this.showSearchInput === false) {
        this.showSearchInput = true
      } else {
        if (this.searchText != undefined) {
          this.search(this.searchText)
        }
      }
    },
    selectTab(tab: string): void {
      this.selectedTab = tab
    },
    isTabActive(tab: string): boolean {
      return this.selectedTab === 'All' || this.selectedTab === tab
    },
    goBack(): void {
      this.clear()
      this.$router.go(-1)
    },
    onInput(): void {
      if (this.searchText != undefined) {
        this.search(this.searchText)
      }
    }
  }
})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 12vh 83vh;
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
