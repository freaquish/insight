<template>
  <div class="w-full h-screen flex flex-col px-2 py-2">
    <div class="w-full h-10 flex">
      <span class="material-icons" @click="navback">keyboard_backspace</span>
    </div>
    
    <!-- Error -->
    <div v-if="this.errorInChangePassword" class="w-full h-8 px-2 py-1 font-muli flex justify-center font-semibold text-white bg-red-600">
        Invalid Credential, Try again
    </div>

    <div class="w-full h-auto mt-2 flex flex-col pr-6">
      <p class="font-lato font-semibold text-2xl">Change Password</p>
      <p class="font-muli text-sm text-gray-700">
        Changing password will force all device to login again. For better
        security change your password on regular interval.
      </p>
    </div>

    <div class="w-full mt-4 flex flex-col">
        <!-- Old Password -->
      <label class="font-muli text-gray-600">Old Password<span class="text-red-600">*</span></label>
      <div
        class="w-full mt-2 mb-4 pt-2 pb-2 px-2 border-2 rounded-md  border-gray-300 flex"
      >
        <input
          :type="visible ? 'text' : 'password'"
          class="font-muli focus:outline-none w-full text-black focus:text-purple-600"
          v-model="oldPassword"
        />
        <span v-if="this.visible" @click="visible=false" class="material-icons px-1 text-red-500">
          visibility
        </span>
        <span @click="visible=true" v-else class="material-icons px-1 text-gray-500">
          visibility_off
        </span>
      </div>
      
      <!-- New Password -->
      <label class="font-muli text-gray-600">New Password<span class="text-red-600">*</span></label>
      <div
        :class="`w-full mt-2 mb-4 pt-2 pb-2 px-2 border-2 rounded-md  ${(validatingPassword)? 'border-gray-300': 'border-red-600'} flex`"
      >
        <input
          :type="visible ? 'text' : 'password'"
          class="font-muli focus:outline-none w-full"
          v-model="newPassword"
        />
        <span v-if="this.visible" @click="visible=false" class="material-icons px-1 text-red-500">
          visibility
        </span>
        <span @click="visible=true" v-else class="material-icons px-1 text-gray-500">
          visibility_off
        </span>
      </div>
      
      <!-- Confirm New Password -->
      <label class="font-muli text-gray-600">Confirm New Password<span class="text-red-600">*</span></label>
      <div
        class="w-full mt-2 mb-4 pt-2 pb-2 px-2 rounded-md border-2  border-gray-300 flex"
      >
        <input
          type="password"
          class="font-muli focus:outline-none w-full"
          v-model="confirmNewPassword"
        />
      </div>

      <!-- Button -->
      <div class="w-full h-10 px-2 mt-6">
          <button @click="changePasswordClick" class="w-full h-full rounded-md bg-purple-600 font-muli text-white font-semibold">Change</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapState } from 'vuex'
export default Vue.extend({
  data() {
    return {
      oldPassword: null as string | null,
      newPassword: null as string | null,
      confirmNewPassword: null as string | null,
      visible: false as boolean
    }
  },
  computed: {
      ...mapState("auth/auth",['errorInChangePassword']),
      validatingPassword(): boolean {
         if(this.newPassword != null && this.confirmNewPassword != null){
              return (this.newPassword.length >= 8 && this.newPassword === this.confirmNewPassword)
         }
         return true
      }
  },
  methods: {
    ...mapMutations('auth/auth', ['setChangePasswordData', 'resetChangePasswordData']),
    ...mapActions('auth/auth', ['changePassword']),
    navback(): void {
        this.resetChangePasswordData()
        this.$router.go(-1)
    },
    changePasswordClick(): void {
        if(this.newPassword != null && this.confirmNewPassword != null && this.confirmNewPassword === this.newPassword && this.newPassword.length > 8) {
            this.setChangePasswordData({
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            })
            this.changePassword()
        }
    }
  }
})
</script>