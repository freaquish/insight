<template>
 <div class="w-full home break-words flex flex-col justify-end" style="min-height:70vh;">
   <div class="w-full h-auto px-4">
     <h1 class="font-semibold font-muli text-5xl md:text-8xl">creativity surge</h1>
     <h2 class="mt-4 md:w-2/3 text-xl md:text-4xl">A simple and easy way to express yourself, share your creativity, thoughts with friends and family, and compete for the throne of greatness.</h2>
     <h3 class="text-xl mt-4 md:text-4xl">No mask <span class="text-purple-600">&</span> No filters, we promote <span class="font-semibold text-purple-600">The Real You.</span></h3>
     <button @click="onGetStartedClick" class="bg-purple-600 mt-8 rounded-md md:w-auto w-full md:px-20 py-3 md:py-3 text-xl font-semibold">Get Started</button>
   </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    onGetStartedClick(): void {
      this.$router.push('/auth/register')
    },
    
  }
})
</script>

<style scoped>
@media (min-width: 768px) {
    .md\:text-8xl {
      font-size: 6.8rem;
    }
    .img {
      max-width: 70%;
      height: 70vh;
    }
}

.img {
  max-width: 60%;
  height: 70vh;
}
.transient-bg{
  background:linear-gradient(90deg, #080808 2.88%, rgba(30, 30, 30, 0.57) 100%);
}

@media (min-width: 1024px) {
    .lg\:h-8 {
        height: 2rem;
    }
    .lg\:text-8xl {
      font-size: 7rem;
    }
}

.vertical-center{
  margin: 0;
  position: absolute;
  top: 20%;
  -ms-transform: translateY(-20%);
  transform: translateY(-20%);
}



</style>