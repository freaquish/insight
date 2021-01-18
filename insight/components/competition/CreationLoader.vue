<template>
    <div class="w-full h-screen bg-white flex flex-col justify-center">
        <div class="w-full flex justify-center">
            <div class="flex flex-col">
                <infinity-loading :active="true" />
                <p class="font-muli font-semibold text-xl text-gray-700">Creating Competition</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions} from "vuex"
import InfinityLoading from "@/components/InfinityLoading.vue"
export default Vue.extend({
    components: {InfinityLoading},
    mounted(){
        this.create()
    },
    methods: {
        ...mapActions("competition", ['createCompetition']),
        create():void {
            const competition_page = ''
            this.createCompetition(():void => {
                this.$router.replace(competition_page);
            });
        }
    }
})
</script>