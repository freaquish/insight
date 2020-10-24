<template>    
    <div class="width-full">
        <!-- <div class="m-4">
            <ArrowBack @click="$router.go(-1)" />
        </div> -->
        
        <div class="pt-4">
        <div class="font-muli text-black ml-5 mt-5 mb-6 text-xl">
            Account doesn't exist try another one or create new account
        </div>
        <div class="mx-4 mt-4">
            <button class="w-full border rounded-lg bg-green-600 outline-none h-10 text-white focus:outline-none" @click="$router.push('/resetpassword/search_account')">Try another</button>
        </div>
        <div class="mt-6 mx-6 position center">
            <button class="w-full border rounded-lg bg-blue-600 outline-none h-10 text-white focus:outline-none" @click="$router.push('/auth/register')"> Create new account </button>
        </div>
    </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ArrowBack from '@/assets/svg/ArrowBack.vue';
export default Vue.extend({
    components: {
        ArrowBack,
    },
})
</script>