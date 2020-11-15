<template>
  <div
    class="w-full h-full font-muli text-white bg-black min-h-screen pt-2 pb-12"
  >
    <div v-show="!this.showCountryCode" class="w-full h-full">
      <!-- loading Screen -->
      <div
        class="w-full h-full min-h-screen justify-center flex flex-col px-4"
        v-if="this.loading"
      >
        <div class="w-full flex justify-center">
          <div class="loader"></div>
        </div>
        <div class="mt-6 text-center">
          <p>Loading...</p>
        </div>
      </div>

      <div
        v-show="!this.loading"
        class="w-full h-full pt-16 flex flex-col px-4"
      >
        <p class="font-lato font-bold text-3xl">Forgot Password?</p>
        <p class="font-semibold mt-2 break-words pr-10">
          Enter the phone number associated with your account. We will send OTP
          on your phone to verify it's you.
        </p>

        <div class="w-full h-full mt-10">
          <!-- Text Area -->
          <div class="w-full flex flex-col gray rounded-lg px-4 pt-2 pb-2">
            <label class="text-gray-200">Phone Number</label>
            <div class="w-full flex">
              <div @click="toggleCodeDialog()" class="px-2 py-1">
                {{ countryCode }}
              </div>
              <input
                autofocus
                v-model="phoneNumber"
                type="tel"
                class="bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <!-- Login and Send OTP Button -->
          <div class="w-full flex-col mt-16">
            <!-- <div id="recaptcha-container" v-show="false"></div> -->
            <button
              @click="onSendClick"
              id="recaptcha-container"
              class="w-full py-2 rounded-md shadow-md font-semibold bg-white text-black"
            >
              Send
            </button>
            <p
              @click="navigateToLogin"
              class="font-semibold text-sm text-center pt-2 mt-6"
            >
              Remember the credentials? <span class="custom-purple">Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <CountryCode
      :show="showCountryCode"
      @close="toggleCodeDialog"
      @select="assignContryCode"
    />
  </div>
</template>

<script lang="ts">
/**
 * Entry of Phone number to send OTP
 */
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import CountryCode from '@/components/auth/CountryCode.vue'
import { FirebaseAuthentication } from '@/plugins/FirebasePlugin'
export default Vue.extend({
  components: {
    CountryCode,
  },
  data() {
    return {
      showCountryCode: false as boolean,
      countryCode: '+91' as string,
      phoneNumber: '' as string,
      fireauth: undefined as FirebaseAuthentication | undefined,
      loading: false,
    }
  },
  computed: {
    ...mapState('auth/forget_password', {
      number: (state: any) => state.phoneNumber,
      code: (state: any) => state.countryCode,
    }),
  },
  mounted() {
    this.loading = false
    this.phoneNumber = this.number
    this.countryCode = this.countryCode
    this.$nextTick().then(() => {
      this.requestForVerification({
        captchaContainer: 'recaptcha-container',
      })
    })
  },
  methods: {
    ...mapActions('auth/forget_password', [
      'requestForVerification',
      'verifyAccount',
    ]),
    ...mapMutations('auth/forget_password', ['reset']),
    toggleCodeDialog(): void {
      this.showCountryCode = !this.showCountryCode
    },
    assignContryCode(code: string[]): void {
      this.countryCode = code[1]
    },
    navigateToLogin(): void {
      this.$router.replace('/auth/login')
    },
    onSendClick(): void {
      if (this.phoneNumber.length > 0) {
        this.verifyAccount({
          countryCode: this.countryCode,
          phoneNumber: this.phoneNumber,
          call: () => {
            this.loading = true
          },
        })
      }
    },
  },
})
</script>

<style >
.gray {
  background-color: #3a3a3c;
}

.custom-purple {
  color: #5e5ce6;
}

.loader {
  border: 12px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #000000; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>