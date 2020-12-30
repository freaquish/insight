<template>
  <div
    class="w-full h-screen overflow-hidden flex justify-center md:px-32 py-12 md:py-16 font-lato text-white   transient-bg"
  >
    <div class="flex flex-col ">
      <!-- Header -->
      <div class="navbar w-auto flex justify-center h-auto">
        <div class="flex">
          <img src="@/static/favicon.png" class="w-12 h-12 md:w-16 md:h-16" />
          <button
          @click="onLoginClick"
            class="px-4 py-2 md:my-2 mx-4 md:mx-0 border-2 md:ml-10 outline-none font-semibold border-purple-600 bg-transparent rounded-sm hover:bg-purple-600 hover:text-white"
          >
            SKIP TO LOGIN
          </button>
        </div>
      </div>
      <!-- Header Ends Here -->

      <!-- Main Page starts here -->

      <Home />
      <!-- <Discover /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/components/intro/Home.vue'
import Discover from '@/components/intro/Discover.vue'
import FrozenStorage from "@/static/js/local_storage"
export default Vue.extend({
  components: {
    Home,
    Discover,
  },
  mounted(){
    let storage = new FrozenStorage();
    storage.set('vintro', true)
  },
  data() {
    return {
      current_tab: '#Home' as string,
    }
  },
  computed: {
    currentTab(): string {
      return this.current_tab
    },
  },
  methods: {
    setCurrentTab(ref: string): void {
      this.current_tab = ref
    },
    onLoginClick(): void {
      this.$router.push('/auth/login')
    }
  },
})
</script>

<style>
.nav-item:hover {
  border-bottom: 2px solid white;
}

.transient-bg {
  background: linear-gradient(90deg, #080808 2.88%, rgb(31, 31, 31) 100%);
}
</style>