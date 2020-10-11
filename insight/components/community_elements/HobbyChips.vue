<template>
  <div class="w-auto h-auto px-4 py-2 my-2 mx-1 rounded-full bg-pink-600" @click="hobbyclick" >
    <p class="font-muli text-bold text-white text-sm">{{hobby.name}}</p>
  </div>
</template>

<script lang="ts">
import {mapMutations} from "vuex";
export default {
    props: ['hobby'],
        data(){
        return{
          selectedHobby: new Array, 
        }
    },
    methods:{
      ...mapMutations("post/create",['setHobby']), 
      hobbyclick:function(){
        this.selectedHobby.push(this.hobby);
        console.log(this.hobby.name);
        console.log(this.selectedHobby)
      }    
    }
}
</script>
