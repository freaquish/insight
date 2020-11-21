<template>
    <div class="w-full text-white h-full min-h-screen bg-black">
        
        <div class="w-full font-muli h-full flex flex-col pt-10 px-4">
            <p class="text-3xl font-lato font-semibold">Reset Password</p>
            <p class="text-lg mt-2">We'll ask for this password whenever you sign in.</p>

            <div class="w-ful gray flex flex-col mt-10 rounded-lg py-2 px-4">
                <label class="font-semibold">New Password</label>
                <input @input="onConfirmPasswordInput" v-model="newPassword" autofocus type="password" class="focus:outline-none mt-2 bg-transparent" />
            </div>

            <div :class="`w-ful gray flex flex-col mt-10 rounded-lg py-2 px-4 ${isPasswordMatching?'':'border border-red-600'}`">
                <label class="font-semibold">Confirm Password</label>
                <input @input="onConfirmPasswordInput" v-model="confirmPassword" autofocus type="password" class="focus:outline-none mt-2 bg-transparent" />
            </div>

            <div class="w-full mt-20 flex">
                <p @click="loginClick" class="text-purple-600 px-2 py-2 font-semibold">Login</p>
                <button @click="resetClick" class="w-full ml-4 text-center bg-white text-black font-semibold rounded-md">Reset</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoadingContainer from "@/components/LoadingContainer.vue"
import {mapActions} from "vuex"
export default Vue.extend({
    components: {
        LoadingContainer
    },
    data(){
        return {
            loading: false,
            newPassword: null as null | string,
            confirmPassword: null as null | string,
            isPasswordMatching:true
        }
    },
    methods: {
        ...mapActions("auth/forget_password",['changePassword']),
        onConfirmPasswordInput():void {
            if(this.newPassword != null && this.confirmPassword != null && this.confirmPassword != this.newPassword){
                this.isPasswordMatching = false
            }else{
                this.isPasswordMatching = true
            }
        },
        resetClick(): void {
            if(this.newPassword != null && this.confirmPassword != null && this.newPassword.length >= 6 && this.newPassword === this.confirmPassword){
                this.isPasswordMatching = true
                this.changePassword({password:this.newPassword, func: () => {
                    this.loading = true
                }})
            }
        },
        loginClick(): void {
            this.$router.replace('/auth/login')
        }

    }
})
</script>

<style scoped>
.gray {
  background-color: #3a3a3c;
}
</style>