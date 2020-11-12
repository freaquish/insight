<template>
  <div
    class="w-full h-full font-muli text-white min-h-screen bg-black flex flex-col pt-4 px-4"
  >
    <div class=" w-full flex">
      <span @click="$router.go(-1)" class="material-icons text-white"
        >keyboard_backspace</span
      >
    </div>
    <div class="w-full h-auto mt-6">
      <p class="font-bold font-lato text-2xl">
        Enter the OTP sent to your registered phone
      </p>
    </div>
    <div class="w-full h-full mt-8 flex flex-col">
      <div class="w-full h-auto flex justify-center">
        <img
          src="@/assets/svg/fp.svg"
          class="w-40 h-40 rounded-full bg-red-200"
        />
      </div>

      <div class="w-full py-2 mt-6 flex justify-center">
        <input
          v-model="otp"
          @input="otpInput"
          class="w-56 py-4 px-4 gray rounded-md focus:outline-none"
          placeholder="OTP"
        />
      </div>

      <div class="w-full mt-8 flex justify-center">
        <p
          @click="resetClick"
          :class="
            `font-semibold ${
              resetClickable
                ? 'px-8 py-2 text-center text-black bg-white rounded-md shadow-md'
                : ''
            }`
          "
        >
          Resend
          <span v-if="!this.resetClickable" class="text-purple-600">{{
            geTimeString
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
export default Vue.extend({
  data() {
    return {
      otp: null as string | null,
      time: 120 as number,
      resetClickable: false as boolean
    }
  },
  mounted() {
    if (this.phoneNumber === null) {
      this.$router.replace('/auth/fp/entry')
    } else {
      var interval = setInterval(() => {
        this.time -= 1
        if (this.time == 0) {
          this.resetClickable = true
          clearInterval(interval)
        }
      }, 1000)
    }
  },
  updated() {
    if (this.phoneNumber === null) this.$router.replace('/auth/fp/entry')
  },
  computed: {
    geTimeString(): string {
      return `${this.time} sec`
    },
    ...mapState('auth/forget_password', ['phoneNumber'])
  },
  methods: {
    ...mapActions('auth/forget_password', [
      'requestForCodeVerification',
      'resendRequest'
    ]),
    otpInput(): void {
      if (this.otp != null) {
        if (this.otp.length === 6) {
          this.requestForCodeVerification(this.otp)
        } else if (this.otp.length > 6) {
          this.otp = this.otp.slice(0, 6)
          this.requestForCodeVerification(this.otp)
        }
      }
    },
    resetClick(): void {
      if (this.resetClickable) {
        this.resendRequest()
      }
    }
  }
})
</script>

<style>
.gray {
  background-color: #3a3a3c;
}
</style>