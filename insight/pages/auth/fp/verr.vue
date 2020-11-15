<template>
    <div class="w-full h-full min-h-screen flex flex-col bg-white
     py-2 pb-10 px-4">
        <div class="w-full flex">
            <span @click="goBack" class="material-icons">keyboard_backspace</span>
        </div>
        <div class="w-full h-full flex justify-center mt-20">
            <img src="@/assets/svg/error_svg.svg" class="w-64" />
        </div>
        <div class="w-full text-center mt-16">
            <p class="font-muli text-lg text-gray-600">OTP Verification failed, you need to prove credential for reseting your password</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        goBack():void {
            this.$router.replace('/auth/login')
        }
    }
})
</script>