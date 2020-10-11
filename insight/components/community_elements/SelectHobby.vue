<template>
  <div class="w-full h-full flex flex-col bg-white">
    <div class="flex flex-row mx-4 mt-2 h-8">
      <div class="w-auto font-lato pt-2">SELECTED</div>
      <div class="w-auto ml-2">_____________________</div>
    </div>
    <div class="w-auto mx-2 px-2 py-2 mt-2 overflow-y-scroll" style="height:30vh;">
        <div class="w-auto h-auto px-4 py-2 my-2 mx-1 rounded-full bg-blue-600"
         v-for="hob in communityHobbies" 
         :key="communityHobbies.indexOf(hob)"
          >
            <div class="w-4 h-4 rounded-full bg-black text-white text-center mr-0 mt-0 ml-auto text-xs" @click="removeelement" >X</div>
            <p class="font-muli text-bold text-white text-sm">{{hob}}</p>
        </div>
    </div>
    <hr class="bg-black mx-4">
     <div class="w-full flex flex-wrap px-4 py-4 my-4 rounded-lg overflow-y-scroll" style="height:40vh;" >    
      <div v-for="hobby in hobby_list" :key="hobby_list.indexOf(hobby)">
        <div class="w-auto h-auto px-4 py-2 my-2 mx-1 rounded-full bg-blue-600" @click="hobbyclick">
            <p class="font-muli text-bold text-white text-sm">{{hobby.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data(){
        return{
          communityHobbies: new Array,
        }
    },
  mounted() {
    this.fetchHobbies();
  },
  computed: {
      ...mapState('post/create', ['hobby_list', 'hobbyText']),       
  },
  methods: {
    hobbyclick:function(){
      if(this.hobby_list.hobby in this.communityHobbies)
      {
        this.communityHobbies.push(null);
      }else {
        this.communityHobbies.push(this.hobby_list.indexOf());
        }
      },
    // removeelement:function() {
    //     this.communityHobbies.pop();
    // },
     ...mapActions('post/create', ['fetchHobbies']),
  }
}
</script>

<style scoped></style>
