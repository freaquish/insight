<template>
  <div class="w-full h-full bg-white">
    <div class="w-full h-full" v-show="!showCountryCodes">
      <div
        id="register"
        class="max-w-full px-6 py-0  w-screen h-screen bg-white flex flex-col"
      >
        <div class="w-full h-12 flex mt-2 mb-2">
          <div
            v-if="this.pageIndex > 1"
            class="px-4 pt-2 rounded-full bg-green-400"
          >
            <span class="text-xl font-muli text-white">1</span>
          </div>
          <div v-else class="border border-gray-300 px-4 pt-2 rounded-full">
            <span class="text-xl font-muli text-gray-900">1</span>
          </div>
          <hr
            v-if="this.pageIndex > 1"
            class="horizontal-line mt-6 border border-green-400 "
          />
          <hr v-else class="horizontal-line mt-6" />

          <div class="border border-gray-300 px-4 pt-2 rounded-full">
            <span class="text-xl font-muli text-gray-900">2</span>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="this.err"
          class="w-full h-10 rounded-md flex mt-2 px-1 py-2 bg-red-500"
        >
          <p class="font-montserrat text-white font-semibold">
            {{ errorText }}
          </p>
        </div>
        <!-- Body -->
        <!-- First Page -->
        <div class="w-full">
          <div v-if="this.pageIndex === 1" class="w-full flex flex-col">
            <p class="text-2xl font-muli font-bold text-gray-800 my-4">
              Tell us about yourself!
            </p>

            <!-- Email -->
            <div
              class="w-full email h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
              id="email-field"
            >
              <label class="font-montserrat text-gray-600"
                >Email<span class="text-green-400 font-bold"> *</span></label
              >
              <input
                v-model="email"
                class="h-6 px-2 focus:outline-none caret-green font-muli"
              />
            </div>
            <!-- Email Ends -->

            <!-- Phone -->
            <div
              class="w-full phone h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
              id="phone-field"
            >
              <label class="font-montserrat text-gray-600"
                >Phone<span class="text-green-400 font-bold"> *</span></label
              >
              <div>
                <span class="px-2 py-2  font-muli" @click="showCountryCodeDialog">{{selectedContryCode[1]}}</span>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  @input="accountCheck"
                  class="h-6 px-1 focus:outline-none caret-green font-muli"
                />
                <span
                  v-if="
                    this.accountAvailable != undefined && this.accountAvailable
                  "
                  class="material-icons stroke-current text-green-400"
                  >check</span
                >
                <span
                  v-else-if="
                    this.accountAvailable != undefined && !this.accountAvailable
                  "
                  class="material-icons stroke-current text-red-400"
                  >clear</span
                >
              </div>
            </div>
            <!-- Phone Ends -->

            <div
              id="password-field"
              class="w-full h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
            >
              <label class="font-montserrat text-gray-600"
                >Password<span class="text-green-400 font-bold"> *</span></label
              >
              <input
                v-model="password"
                type="password"
                class="h-6 px-2 focus:outline-none caret-green font-muli"
              />
            </div>
            <div
              class="w-full h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
            >
              <label class="font-montserrat text-gray-600"
                >Confirm Password<span class="text-green-400 font-bold">
                  *</span
                ></label
              >
              <input
                v-model="confirmPassword"
                type="password"
                @input="matchPassword(undefined)"
                class="h-6 px-2 focus:outline-none caret-green font-muli"
              />
            </div>
          </div>

          <div v-if="this.pageIndex === 2" class="w-full flex flex-col">
            <p class="text-2xl font-muli font-bold text-gray-800 my-4">
              Let's get personal!
            </p>

            <div
              class="w-full h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
              id="username-field"
            >
              <label class="font-montserrat text-gray-600"
                >Username<span class="text-green-400 font-bold"> *</span></label
              >
              <div class="flex w-full justify-between pr-2">
                <input
                  v-model="username"
                  @input="usernameLookup()"
                  class="h-6 px-2 focus:outline-none caret-green font-muli"
                />
                <span
                  v-if="
                    this.usernameAvailable != undefined &&
                      this.usernameAvailable
                  "
                  class="material-icons stroke-current text-green-400"
                  >check</span
                >
                <span
                  v-else-if="
                    this.usernameAvailable != undefined &&
                      !this.usernameAvailable
                  "
                  class="material-icons stroke-current text-red-400"
                  >clear</span
                >
              </div>
            </div>

            <div
              class="w-full  h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
              id="first-name"
            >
              <label class="font-montserrat text-gray-600"
                >FirstName<span class="text-green-400 font-bold">
                  *</span
                ></label
              >
              <input
                v-model="firstName"
                class="h-6 px-2 focus:outline-none caret-green font-muli"
              />
            </div>
            <div
              class="w-full h-auto border border-gray-400 rounded-md py-2 px-2 flex flex-col my-2"
              id="last-name"
            >
              <label class="font-montserrat text-gray-600"
                >Last Name<span class="text-green-400 font-bold">
                  *</span
                ></label
              >
              <input
                v-model="lastName"
                class="h-6 px-2 focus:outline-none caret-green font-muli"
              />
            </div>
          </div>

          <div id="captcha-elem"></div>
        </div>

        <!-- Bottom -->
        <div class="w-full flex justify-between px-2 py-2 mt-4">
          <p
            @click="$router.push('/auth/login')"
            v-if="this.pageIndex === 1"
            class="font-lato font-semibold text-green-400 text-xl"
          >
            Login
          </p>
          <p
            v-if="this.pageIndex > 1"
            class="font-lato font-semibold text-green-400 text-xl"
            @click="updatePageIndex(1)"
          >
            Back
          </p>
          <button
            @click="nextClick"
            v-if="this.pageIndex === 1"
            id="next-button"
            class="px-24 py-2 rounded-md bg-blue-600 text-white font-lato font-semibold text-xl"
          >
            Next
          </button>
          <button
            v-if="this.pageIndex === 2"
            class="px-24 py-2 focus:outline-none rounded-md bg-blue-600 text-white font-lato font-semibold text-xl"
            @click="registerClicked()"
          >
            Register
          </button>
        </div>
      </div>
    </div>
    <CountryCode :show="showCountryCodes" @close="closeCountryCode" @select="selectCountryCode" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CountryCode from "@/components/auth/CountryCode.vue"

export default {
  components:{
    CountryCode
  },
  data() {
    return {
      isPasswordMatching: undefined,
      email: undefined,
      phoneNumber: undefined,
      password: undefined,
      confirmPassword: undefined,
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      loadingState: false,
      otpCode: undefined,
      firebaseInstance: undefined,
      showCountryCodes: false,
      selectedContryCode: ["India","91"]
    }
  },
  computed: {
    ...mapState('auth/register', {
      firstNameState: state => state.firstName,
      lastNameState: state => state.lastName,
      emailState: state => state.email,
      phoneNumberState: state => state.phoneNumber,
      usernameState: state => state.username,
      passwordState: state => state.password,
      usernameAvailable: state => state.usernameAvailable,
      err: state => state.err,
      pageIndex: state => state.pageIndex,
      errorText: state => state.errorText,
      accountAvailable: state => state.accountAvailable
    })
  },
  methods: {
    ...mapMutations('auth/register', [
      'insertFirstPageData',
      'insesrtSecondPageData',
      'updatePageIndex'
    ]),
    ...mapActions('auth/register', [
      'checkUsernameAvailibility',
      'uploadDatatoServer',
      'checkAccountAvailibility'
    ]),
    closeCountryCode(){
      this.showCountryCodes = false
    },
    showCountryCodeDialog() {
      this.showCountryCodes = true
    },
    selectCountryCode(code){
      this.selectedContryCode = code
      this.closeCountryCode()
    },
    nextClick: function() {
      if (this.accountAvailable != undefined && this.accountAvailable) {
        this.verifyFirstPageInput()
        if (
          this.email != undefined &&
          this.email != '' &&
          this.phoneNumber != undefined &&
          this.phoneNumber != '' &&
          this.password != undefined &&
          this.password != '' &&
          this.confirmPassword != undefined &&
          this.confirmPassword != ''
        ) {
          if (this.password === this.confirmPassword && this.selectedContryCode.length > 0) {
            // Moving on the next page after committing everything to store
            this.insertFirstPageData({
              email: this.email,
              phoneNumber: this.phoneNumber,
              countryCode: this.selectedContryCode[1],
              password: this.password
            })

            this.updatePageIndex(2)
          }
          // Verify password is correct
          this.matchPassword(() => {
            this.password = undefined
            this.confirmPassword = undefined
          })
        }
      }
    },

    verifyFirstPageInput: function() {
      // Verify Email is correct
      let emailElement = document.getElementById('email-field')
      if (
        this.email === undefined ||
        this.email.indexOf('@') === -1 ||
        this.email === ''
      ) {
        emailElement.style.setProperty('border-color', '#f56565')
      } else {
        emailElement.style.setProperty('border-color', '#cbd5e0')
      }

      // Verify Phone Number is correct
      let phoneElement = document.getElementById('phone-field')
      if (
        this.phoneNumber === undefined ||
        this.phoneNumber.indexOf('+') > -1 ||
        !(this.phoneNumber.match(/[a-z]/gi) === null) ||
        this.phoneNumber === ''
      ) {
        phoneElement.style.setProperty('border-color', '#f56565')
      } else {
        phoneElement.style.setProperty('border-color', '#cbd5e0')
      }
    },
    matchPassword: function(func) {
      let passwordField = document.getElementById('password-field')
      if (
        this.password != this.confirmPassword ||
        this.password === '' ||
        this.confirmPassword === ''
      ) {
        passwordField.style.setProperty('border-color', '#f56565')
        if (func != undefined) {
          func()
        }
      } else {
        passwordField.style.setProperty('border-color', '#cbd5e0')
      }
    },

    usernameLookup: function() {
      this.checkUsernameAvailibility(this.username)
    },
    registerClicked: function() {
      // this.loadingState = true;
      this.verifySecondPageInput()
      if (
        this.username.length >= 6 &&
        this.firstName.length >= 3 &&
        this.lastName.length >= 2
      ) {
        this.loadingState = true
        let data = {
          firstName: this.firstName,
          username: this.username,
          lastName: this.lastName
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            data['ccords'] = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          })
        }
        this.insesrtSecondPageData(data)
        this.uploadDatatoServer()
      }
    },
    verifySecondPageInput: function() {
      let usernameField = document.getElementById('username-field')
      let first_name = document.getElementById('first-name')
      let last_name = document.getElementById('last-name')

      if (
        this.username === undefined ||
        this.username === '' ||
        !this.usernameAvailable
      ) {
        usernameField.style.setProperty('border-color', '#f56565')
      } else {
        usernameField.style.setProperty('border-color', '#cbd5e0')
      }

      if (this.firstName === undefined || this.firstName === '') {
        first_name.style.setProperty('border-color', '#f56565')
      } else {
        first_name.style.setProperty('border-color', '#cbd5e0')
      }

      if (this.lastName === undefined || this.lastName === '') {
        last_name.style.setProperty('border-color', '#f56565')
      } else {
        last_name.style.setProperty('border-color', '#cbd5e0')
      }
    },
    accountCheck: function() {
      if (this.phoneNumber != undefined && this.phoneNumber.length > 9) {
        this.checkAccountAvailibility(this.phoneNumber)
      }
    }
  }
}
</script>

<style scoped>
.special-green {
  background-color: #5fbe64;
}
.horizontal-line {
  width: 80%;
}

.caret-green {
  caret-color: #71bb5b;
}

</style>
