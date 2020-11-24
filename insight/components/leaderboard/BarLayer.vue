<template>
  <div v-if="false" class="w-full h-full">
    <div class="w-auto h-full flex justify-around">
    <div class="w-full flex justify-center">
      <div class="absolute bar2-container pad">
        <img src="@/assets/svg/leaderboard/Bar2.svg" class="bar2"/>
      </div>
      <div class="absolute bar1-container z-10 pad">
        <img src="@/assets/svg/leaderboard/Bar1.svg" class="bar1"/>
      </div>
      <div class="absolute bar3-container pad">
        <img src="@/assets/svg/leaderboard/Bar3.svg" class="bar3" />
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.bar1-container{
    top: 15.375rem;
}

.bar1{
  width: 12.3125rem;
  height: 36.9351rem;
}

.bar2 {
  width: 10.756691rem;
  height: 32.3125rem;
}
.bar2-container {
  top: 19.2500rem;
  left: 0.027499rem;
}

.bar3-container {
  top: 20.863rem;
  left: 16.35086rem;
}

.bar3{
  width: 10.3124rem;
  height: 32.8438rem;
}
</style>
