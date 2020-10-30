<template>
    
    <div class="width-full">
        <div class="p-4">
            <ArrowBack @click="$router.go(-1)" />
        </div>
        
        <div class="pt-20">
        <div class="font-muli text-black ml-5 mt-5 mb-6 text-xl">
            Enter the registered mobile number
        </div>
        <div class="mx-4 mt-4">
            <input
            class="outline-black rounded-lg w-full bg-gray-200 h-12 text-black font-muli focus:outline-none focus:border focus:border-black p-3"
            type="text" name="account_id">
        </div>
        <div class="mt-6 mx-6 position center">
            <button class="w-full border rounded-lg bg-blue-600 outline-none h-10 text-white focus:outline-none" @click="$router.push('/resetpassword/otpconfirm')">Get OTP</button>
        </div>
    </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import ArrowBack from '@/assets/svg/ArrowBack.vue';
export default Vue.extend({
    components: {
        ArrowBack,
    },
})
</script>