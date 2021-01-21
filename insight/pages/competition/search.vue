<template>
  <div
    class="w-full h-full min-h-screen bg-morphism relative overflow-x-hidden overflow-y-scroll"
  >
    <div class="w-full fixed flex flex-col pt-4 px-4 pb-4">
      <div class="w-full flex">
        <span class="material-icons">keyboard_backspace</span>
        <h1 class="ml-6 text-xl font-semibold font-lato">Search</h1>
      </div>
      <div class="w-full flex mt-2 mx-2">
        <span
          class="material-icons block px-2 text-gray-600 pt-2 bg-slime-gray rounded-l-md"
          >search</span
        >
        <input
          v-model="name"
          placeholder="Search"
          class="w-full placeholder-gray-600 font-muli font-semibold px-2 py-2 outline-none focus:outline-none bg-slime-gray rounded-r-md"
        />
        <span class="material-icons block px-2 pt-2 text-gray-700 bg-slime-gray mx-4 rounded-md"> filter_list </span>
      </div>
    </div>

    <!-- body -->
    <div class="w-full h-full mt-4"></div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: null as string | null,
    }
  },
  methods: {
    onBackClick(): void {
      this.$router.go(-1)
    },
  },
})
</script>

<style scoped>
.bg-morphism {
  background: #f1f3f6;
  /* backdrop-filter: blur( 11.0px ); */
}

.bg-slime-gray {
  background: #e5e7ea;
}
</style>