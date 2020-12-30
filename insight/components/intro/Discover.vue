<template>
  <div
    id="Discover"
    class="w-full mt-48 break-words flex flex-col justify-end"
    style="min-height: 70vh; height:auto;"
  >
    <div class="w-full h-full relative">
      <div class="hidden md:block w-full h-full absolute z-0">
        <img
        src="@/assets/svg/intro/discover.svg"
        class="rounded-md py-4 w-full col-span-2 md:col-span-1 "
        
      />
      </div>
    <div class="w-full static md:absolute z-10 h-auto px-4 opake grid grid-flow-row md:grid-cols-3">
      <div class="w-auto h-auto col-span-2">
        <h1 class="font-semibold font-muli text-6xl md:text-8xl">di<span class="text-purple-600 md:text-white">s</span>cover</h1>
        <h2 class="mt-4 md:w-4/5 text-xl font-montserrat md:text-2xl">Discover creativity from the depth of your neigbhourhood to the width of the world.you can utilise our powers to find out what your friends or family like to explore!</h2>
        <h2 class="mt-4 md:w-4/5 text-xl font-montserrat md:text-2xl">We know you get disturbed when you cannot find a single person around you with same interests, that's why we have made this.</h2>
      </div>
    </div>
      <img
        src="@/assets/svg/intro/discover.svg"
        class="block md:hidden rounded-md py-4 w-screen col-span-2 md:col-span-1 "
        style="width:100vw; height: 24rem;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  props: {
    tab: '' as PropOptions<string>,
  },
})
</script>

<style scoped>
.transient-bg {
  background: linear-gradient(
    90deg,
    #080808 2.88%,
    rgba(30, 30, 30, 0.57) 100%
  );
}

.opake {
  background: linear-gradient(180deg, rgba(18, 15, 15, 0.34) 0%, rgba(19, 18, 18, 0.35) 100%);
}
@media (min-width: 768px) {
  .md\:text-8xl {
    font-size: 6.8rem;
  }
  .img {
    max-width: 70%;
    height: 70vh;
  }
}
@media (min-width: 768px) {
  .md\:img {
    z-index: -10;
    height: 70vh;
    left: 52%;
    top: 0%;
  }
}
.img {
  z-index: -10;
  height: 70vh;
  left: 52%;
  top: 36%;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 20%;
  -ms-transform: translateY(-20%);
  transform: translateY(-20%);
}
</style>