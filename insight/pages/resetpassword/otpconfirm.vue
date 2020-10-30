<template>    
    <div class="width-full">
        <div class="m-4">
            <ArrowBack @click="$router.go(-1)" />
        </div>
        
        <div class="pt-2">
        <div class="font-muli text-black ml-5 mt-5 mb-6 text-xl">
            Enter 6 digit OTP sent on your mobile number
        </div>
        <div class="mx-4 mt-4">
            <input
            class="outline-black rounded-lg w-full bg-gray-200 h-12 text-black font-muli focus:outline-none focus:border focus:border-black p-3"
            type="text">
            <button class="text-sm text-right bg-transparent mr-4 text-blue-500 focus:outline-none focus:bg-transparent focus:text-purple-500">Resend OTP</button>
        </div>
        <div class="mt-6 mx-6 position center">
            <button class="w-full border rounded-lg bg-blue-600 outline-none h-10 text-white focus:outline-none" @click="$router.push('/resetpassword/createpass')">Verify OTP</button>
        </div>
    </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
// TODO error in this line why ??????
import ArrowBack from '@/assets/svg/ArrowBack.vue';
export default Vue.extend({
    components: {
        ArrowBack,
    },
})
</script>