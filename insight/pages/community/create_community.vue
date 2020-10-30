<template>
    <div class="w-full h-full relative overflow-hidden">
        <div v-show="Showpage" class="w-full h-full absolute z-20 shadow-lg bg-white">
            <div class="w-full" style="height:90%;">
                <SelectHobby  />
            </div>
            <div class="w-full " style="height:10%;">
                <div class="w-32 py-1 mx-auto my-auto rounded-full bg-green-700 text-white text-center" @click="returntopage">Done</div>
            </div>    
        </div>
        <div class="w-auto h-32 mx-4 mt-2 rounded-lg">
            <img class="w-full h-full rounded-lg" src="@/assets/svg/banner.svg">
        </div>
        <div class="ml-4 mt-4 text-lg font-bold font-lato">Create Community</div>
        <div class="ml-4 mt-1 text-sm font-lato text-gray-600">Fill details below to get started</div>
        <div class="w-auto mx-4 mt-4 border-2  border-gray-500 focus:border-blue-700 focus:bg-blue-200 rounded-lg">
            <input class="w-full py-3 px-4 outline-none bg-transparent font-bold" 
            type="text" 
            placeholder="Community Name"
            v-model="communityName" >
        </div>
        <div class="w-auto mx-4 mt-4 border-2 rounded-lg border-gray-500 focus:border-blue-700 focus:bg-blue-200">
            <div class="flex flex-row py-3 px-4">
                <span class="font-bold">@</span>
                <input class="w-full outline-none bg-transparent ml-1"
                    id="tag-field" 
                    type="text" 
                    placeholder="tage here"
                    @input="checkTagName()"
                    v-model="communityTag" >
                <span>tick</span>
            </div>
        </div>
        <div class="w-auto mt-4 mx-4 border-2 rounded-lg border-gray-500 focus:border-blue-700 focus:bg-blue-200">
            <textarea class="px-4 pt-1 outline-none bg-transparent" name="" id="" cols="40" rows="5" 
                placeholder="Discription of community...."
                v-model="discription" >
            </textarea>
        </div>
        <div class="flex flex-row mt-8 text-center">
            <div class="px-4 py-2 rounded-lg text-white ml-4 mr-auto font-semibold text-lg" 
            style="background:#FA0096;"
            @click="hobbypageshow">+ Hobby</div>
            <div class="px-8 py-2 rounded-lg bg-blue-700 text-white ml-auto mr-4 font-semibold text-lg"
            @click="createclick()"
             >Create</div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import SelectHobby from '@/components/community_elements/SelectHobby.vue'
export default Vue.extend({
    data() {
        return {
            // communityName: undefined,
            // communityTag: undefined,
            // discription: undefined,
            Showpage:false,
        }
    },
    components: {
        SelectHobby
    },
    computed: {
        ...mapState('community/create', ['communityName', 'communityTag' ,'communityTagAvailabel', 'discription' ]),
    },
    methods: {
        ...mapMutations('community/create', ['setCommunityData']),
        ...mapActions('community/create', ['checkcommunityTagAvailabel', 'uploadDataToServer']),
        checkData(): void {
            if( this.communityName != undefined && this.communityTag != undefined
            && this.discription != undefined ) {
                this.verifyInputData();
                this.setCommunityData({
                    communityName: this.communityName,
                    communityTag: this.communityTag,
                    discription: this.discription,
                });
            }
        },
        checkTagName(): void {
            this.checkcommunityTagAvailabel(this.communityTag);
        },
        verifyInputData(): void {
            let tagelement = document.getElementById('tag-field')
            // this.communityTag === undefined ||
            // this.communityTag.indexOf(' ') === -1 ||
            // this.communityTag === ''
        },
        createclick(): void {
            this.uploadDataToServer();
        },
        hobbypageshow(): void {
            this.Showpage= true;
        },
        returntopage(): void {
            this.Showpage= false;
        }
    }
})
</script>

<style scoped>

</style>