<template>
    <div class="w-full h-full overflow-y-scroll flex flex-col bg-black">

      <!-- First Page -->

         <div class="h-auto w-full px-2 py-2 flex mt-4 ml-2">
            <p @click="$router.push('/auth/login')"  class="px-4 py-1 bg-blue-500 text-white rounded-full">
            <span class="text-lg">Login</span>
            </p>
         </div>


         <div class="w-full h-full mt-8">
           <img style="width:60%; height:60%;" class="mx-auto" src="@/assets/intro/freaquish.svg" alt="">
           <div class="mt-4 text-center text-white">
              <p class="mt-4"> 
                <span class="text-xl text-red-500 font-muli font-bold">Stop Searching </span>
                <span class="text-sm font-muli"> anywhere else....</span>
                <br>
                <span class="mt-4 font-muli">The platform is here you waiting for</span>
              </p>
             <p class="mt-4"> 
               <span class="text-xl font-muli font-bold text-blue-700">Freaquish </span>
                <span class="text-sm font-muli font-bold">a great platform <br> to show the world</span> 
                <br> 
                <span class="text-xl">the real of you</span>  
              </p>
           </div>         
         </div>


       <!-- Second Page -->

        <div class="w-full h-auto mt-24">
           <img style="width:60%; height:60%;" class="mx-auto" src="@/assets/intro/hobby1.svg" alt="">
           <div class="mt-4 text-center text-white">
             <p class="text-xl font-lato font-bold mt-4 text-green-700">Hobby Gallery</p>
             <p class="mt-4 font-muli px-4 text-sm"> 
                Explore the exciting and great collections of hobby and become the part of the choice of your hobby.
              </p>
           </div>         
         </div>


       <!-- Third Page -->
        <div class="w-full h-auto mt-24">
           <img style="width:60%; height:60%;" class="mx-auto" src="@/assets/intro/discover.svg" alt="">
           <div class="mt-4 text-center text-white">
             <p class="text-xl font-lato font-bold mt-4 text-purple-700">Discover</p>
             <p class="mt-4 font-muli px-4 text-sm"> 
                Discover great post around the great hobbies, make friends and do creative things.
              </p>
           </div>         
         </div>


       <!-- Fourth Page -->
       <div class="w-full h-auto mt-24">
           <img style="width:60%; height:60%;" class="mx-auto" src="@/assets/intro/leaderboard1.svg" alt="">
           <div class="mt-4 text-center text-white">
             <p class="text-xl font-lato font-bold mt-4 text-yellow-700">LeaderBoard</p>
             <p class="mt-4 font-muli px-4 text-sm"> 
                Show your talent, post in your favorite hobby and get ranked.
                <br class="mt-4">
                Get inspired and inspire everyone.
              </p>
           </div>         
        </div>

        <!-- fifth page -->
        <div class="w-full h-auto mt-24 mb-24">
           <img style="width:60%; height:60%;" class="mx-auto" src="@/assets/intro/engaged.svg" alt="">
           <div class="mt-4 text-center text-white">
             <p class="text-xl font-lato font-bold mt-4 text-blue-700">Get Engaged</p>
             <p class="mt-4 font-muli px-4"> 
                Get engaged with us and see the world of hobby that you dreamt about.
              </p>
           </div>                    
         </div>
         <div class="h-auto w-auto px-2 py-2 mb-16 mr-4 ml-auto">
              <p @click="$router.push('/auth/register')"  class="px-4 py-1 bg-red-600 shadow-xl rounded-full">
                <span class="text-lg text-white">Register</span>
              </p>
          </div>
    </div>
</template>

<script>
import FrozenStorage from "@/static/js/local_storage.js";
export default{
  mounted() {
    this.insetDataInStorage();
  },
  methods:{
    insetDataInStorage: function(){
      let storage = new FrozenStorage();
      storage.set('vintro','1');
    }
  }
}
</script>

<style scoped>

</style>
