<template>
  <div class="w-full h-full grided bg-tint-purple">
    <div class="w-full fixed flex pt-4 px-2">
      <span class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
      <div class="w-full h-full flex flex-row-reverse">
        <span class="material-icons stroke-current text-white">search</span>
        <input
          class="w-full ml-6 mr-4 py-1 rounded-md focus:outline-none text-white font-muli bg-tint-purple-shallow placeholder-white px-2"
          placeholder="Type name, hobby or tag..."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
.grided {
  display: grid;
  grid-template-rows: 5vh 90vh;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
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
