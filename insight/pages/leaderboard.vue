<template>
    <div class="w-full h-full overflow-hidden">
        <!-- leaderboard banner -->
        <div class="w-full h-full z-0 absolute">
            <img src="@/assets/img/ldboard.png" class="w-full fixed" style="height:50vh">
        </div>
        <!-- leaderboard banner -->



        <div class="w-full h-full z-20 absolute">

            <!-- back and serach box -->
            <div class="w-full flex fixed pt-2">

                <span @click="goBack()" class="material-icons stroke-current text-white font-bold pl-2"
                    >keyboard_backspace
                </span>
                
                <div class="w-full h-full   pr-2">
                    <div class="w-auto mr-4 ml-4 flex flex-row-reverse bg-red-200 rounded-full"
                    style="background: rgba(92, 139, 183, 0.29);">
                        <span
                            @click="onClickSearch(), searchOn = true, searchOff = false"
                            class="material-icons stroke-current text-white mt-1 mr-1 z-30"
                            >search
                        </span>

                        <div class="w-full ml-6 mr-4 py-1 bg-transparent text-white font-muli px-2">
                            <input
                            v-if="activeSearchTab1"
                            class="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            v-model="searchText"
                            placeholder="Search by Hobby"
                            />
                            <input
                            v-if="activeSearchTab2"
                            class="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            v-model="searchText"
                            placeholder="Search by Name"
                            />                          
                        </div>

                        <div class="ml-0 px-2 mr-auto pt-2 font-bold rounded-r-full" 
                            style="transform:rotate(180deg); background: rgba(33, 20, 83, 0.38);"
                            @click="searchTabVisible = searchTabVisible === true ? false : true, myRankVisible = false, visiblity = false "                      
                            >^
                        </div>                   
                    </div>
                </div>               
            </div>

            <div
                v-if="searchTabVisible"                             
                class="py-2 mt-12 ml-12 h-auto w-40 bg-white text-black text-sm z-30 rounded-lg shadow-xl fixed font-muli">
                <div 
                v-for="search in searchTab" :key="search.activeSearch"
                class="w-full h-full">
                    <div v-if="searchIndex === searchTab.indexOf(search)" class="text-blue-600 bg-gray-200 pl-4">
                        <p>{{search.searchMode}} </p>                  
                    </div>
                    <div v-else @click="searchIndex = searchTab.indexOf(search), activeSearchTab(), searchTabVisible = false" class="pl-4">
                        <p>{{search.searchMode}}</p>
                    </div>
                </div>
            </div>
            <!--back and serach box -->


           <!-- search Result -->
            <div
                v-if="searchRankResult"
                class="z-50 absolute" 
                style="height:70vh; margin-top:14vh; width:96%; margin-left:2%;">
                <div v-if="searchOn" class="w-full mt-1 px-4 pb-2 overflow-x-scroll flex">
                    <div v-for="hobby in hobbies" :key="hobby.code_name">
                        <div v-if="hobby.name != undefined && hobby.name.length > 1">
                        <HobbySelector1
                            :active="hobby.code_name === selected.code_name"
                            :hobby="hobby"
                            @select="hobbySelected"
                        />
                        </div>
                    </div>
                </div>
                <div class="w-full pt-4 pb-2 bg-white rounded-lg flex flex-col absolute shadow-lg" style="height:50vh">
                    <div class="w-full h-full overflow-y-scroll mb-8">
                        <!-- <div v-for="user in users" :key="user.account.account_id">
                            <RankCardBox1 :scorecard="user" />
                        </div> -->
                    </div>
                </div>
                <div 
                    class="h-8 absolute w-full shadow-lg rounded-b-lg"
                    @click="searchRankResult = false, searchOff = true , searchOn = false" 
                    style="bottom:0; left:0; margin-bottom:0; margin-top:auto;">
                    <div class="w-full h-full bg-blue-700 rounded-b-lg text-white font-muli text-center pt-1">
                        BACK
                    </div>
                    
                </div>
            </div>

           <!-- serach Result -->

            <div class="mainbox w-full bg-white overflow-y-scroll pt-4" style="margin-top:48vh; max-height:100vh">
                <!-- hobby selector -->
                <div v-if="searchOff" class="w-full mt-2 px-4 pb-2 overflow-x-scroll flex">
                    <div v-for="hobby in hobbies" :key="hobby.code_name">
                        <div v-if="hobby.name != undefined && hobby.name.length > 1">
                        <HobbySelector1
                            :active="selected != undefined && hobby.code_name === selected.code_name"
                            :hobby="hobby"
                            @select="hobbySelected"
                        />
                        </div>
                    </div>
                </div>
                <!-- hobby selector -->

                <!-- sort by and my rank -->
                <div class="w-full h-12 py-2 flex flex-row">
                    <div class="mx-auto rounded-lg shadow-lg flex flex-row" style="width:45%">
                        <p class="text-sm text-pink-500 font-muli font-semibold pl-4 py-1">{{sortBy_data}}</p>
                        <div class="mr-0 px-2 ml-auto pt-2 font-bold border-r-2 border-gray-400" 
                        style="transform:rotate(180deg)"
                        @click="visiblity = visiblity === true ? false : true , myRankVisible = false , searchTabVisible = false "                      
                        >^</div>
                        <!-- sort by -->
                        <div v-if="visiblity" class="py-2 mt-10 h-auto bg-white z-30 rounded-lg shadow-xl absolute" style="width:40%">
                            <div class="px-auto py-1 text-center font-muli text-sm font-semibold"
                            v-for="sorts in sortby" :key="sorts.activesort"
                            >
                                <div v-if="activeIndex === sortby.indexOf(sorts)" class="text-blue-600 py-1 bg-gray-200 text-md font-bold ">
                                <p>{{sorts.sortMode}} </p>                  
                                </div>
                                <div v-else @click="activeIndex = sortby.indexOf(sorts), visiblity = false , sortBy_data = sorts.sortMode" class="font-muli text-sm font-semibold ">
                                <p>{{sorts.sortMode}}</p>
                                </div>
                            </div>
                        </div>
                        <!-- sort by -->
                    </div>

                    <div class="mx-auto rounded-lg shadow-lg" style="width:40%">
                        <p class="text-sm text-pink-500 font-muli font-semibold text-center pt-1"
                        @click="myRankVisible = myRankVisible === true ? false : true, visiblity = false, searchTabVisible = false "
                        >My Rank</p>
                    </div>

                        <div v-if="myRankVisible" 
                            class="z-30 absolute mt-12 w-full h-auto">
                            <div v-if="myAccExist" class="w-auto mx-1 rounded-lg bg-white h-auto py-2">
                                <div v-for="user in users" :key="user.account.account_id">
                                    <div v-if="user == user.account.self">
                                        <RankCardBox1 :scorecard="user" />
                                    </div>   
                                </div>
                            </div>
                            <div v-else class="w-auto mx-1 rounded-lg bg-white h-auto py-2 flex ">                             
                                <p class="text-center mx-auto font-muli font-semibold text-base">You have no post in this hobby yet. <br>
                                Post now and check your ability</p>
                                <div class="rounded-full bg-red-800 text-white font-bold text-right w-6 h-6 text-sm mr-0 ml-auto mt-0"
                                @click="myRankVisible = false">
                                    <p class="text-center">X</p>
                                </div>
                            </div>
                        </div>

                </div>
                <!-- sort by and my rank -->

                


                <!-- Scoreboard -->
                <div
                    class="w-full px-2 py-4 bg-white flex flex-col absolute"
                    style="max-height:69vh;"
                    >
                    <div class="w-full h-full overflow-y-scroll mb-8">
                            <!-- <div v-for="user in users" :key="user.account.account_id">
                                <RankCardBox1 :scorecard="user" />
                            </div> -->
                    </div>
                </div>
                <!-- Scoreboard -->


            </div>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from 'vue'
import { RankCard, Hobby } from '@/types/index'
import { mapState, mapActions } from 'vuex'
import HobbySelector1 from '@/components/leaderboard/HobbySelector1.vue'
import RankCardBox1 from '@/components/leaderboard/RankCardBox1.vue'

export default Vue.extend({

    data(){
        return {
            sortby: [
                {'sortMode': 'Sort By Score' , 'activesort': 'Sort By Score'},
                {'sortMode': 'Sort By Love' , 'activesort': 'Sort By Love'},
                {'sortMode': 'Sort By View' , 'activesort': 'Sort By View'}
            ],
            searchTab: [
                {'searchMode' : 'Search By Hobby' , 'activeSearch' : 'Search By Hobby'},
                {'searchMode' : 'Search By Name' , 'activeSearch' : 'Search By Name'}
            ],
            searchIndex: 0,
            activeIndex: 0,
            visiblity: false,
            sortBy_data: 'Sort By Score',
            myRankVisible: false,
            myAccExist: false,
            searchTabVisible: false,
            activeSearchTab1: true,
            activeSearchTab2: false,
            searchRankResult: false,
            searchText: undefined as string | undefined,
            searchOn: false,
            searchOff: true,
        }
    },
  mounted() {
    this.fetch([])
  },
  components: {
    HobbySelector1,
    RankCardBox1
  },
  computed: {
    ...mapState('leaderboard', ['hobbies', 'users', 'selected'])
  },
  methods: {
    ...mapActions('leaderboard', ['fetch']),
    hobbySelected(hobby: Hobby): void {
      this.fetch([hobby.code_name])
    },
    onClickSearch(): void {
        if( this.searchText != undefined && this.searchText != '') {
            this.searchRankResult = true;
            console.log(this.searchText);
        }
    },
    activeSearchTab(): void {
        if(this.searchIndex == 0){
            this.activeSearchTab1 = true;
            this.activeSearchTab2 = false;
        } else if(this.searchIndex == 1){
            this.activeSearchTab1 = false;
            this.activeSearchTab2 = true;
        }
    },
    goBack(): void {
        this.$router.go(-1)
    }
  }
})
</script>


<style scoped>

.mainbox {
    border-top-left-radius: 1.3rem;
    border-top-right-radius: 1.3rem;
}
</style>