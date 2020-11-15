<template>
    <div class="w-full h-full min-h-screen bg-white flex flex-col pt-4 pb-10 px-4">
        <div class="w-full flex">
            <span @click="goBack()" class="material-icons">keyboard_backspace</span>
        </div>

        <div class="mt-32 w-full flex justify-center">
            <img src="@/assets/svg/404.svg" class="w-64" />
        </div>

        <div class="w-full mt-16 text-center">
            <p class="font-muli text-lg text-gray-500">No Account exist, retry with correct details</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods:{
        goBack():void {
            this.$router.replace('/auth/login')
        }
    }
})
</script>