import { MutationTree, ActionTree, Store } from 'vuex'
import { FirebaseAuthentication } from '@/plugins/FirebasePlugin'
import { after } from 'lodash'

export const state = () => ({
  phoneNumber: null as string | null,
  countryCode: '91' as string,
  verified: false as boolean,
  token: '' as string
})

type RootState = ReturnType<typeof state>

var firebaseInstance = null as FirebaseAuthentication | null

const URLS = {
  successAtAccountCheck: '/auth/fp/rsp',
  failureAtAccountCheck: '/auth/fp/naerr',
  successAtVerification: '/auth/fp/otp_in',
  failureAtVerification: '/auth/fp/verr'
}

export const mutations: MutationTree<RootState> = {
  insertCountryCode(state: RootState, code: string) {
    state.countryCode = code
  },
  insertPhoneNumber(state: RootState, number: string) {
    state.phoneNumber = number
  },
  setToken(state, token: string): void {
    state.token = token
  },
  setVerified(state, val: boolean): void {
    state.verified = val
  },
  reset(state): void {
    state.phoneNumber = null
    state.token = ''
    state.verified = false
  }
}

export const actions: ActionTree<RootState, RootState> = {
  requestForVerification(
    { state, commit },
    payload: { captchaContainer: string }
  ): void {
    firebaseInstance = new FirebaseAuthentication(this.$axios)
    firebaseInstance.setDeviceLanguage()
    if (window.recaptchaVerifier != undefined) {
      firebaseInstance.resetRecaptchaVerifier()
    }
    firebaseInstance.setRecaptchaVerifier(
      payload.captchaContainer,
      undefined,
      () => {
        this.$router.push(URLS.successAtVerification)
      }
    )
  },

  verifyAccount(
    { commit },
    payload: { countryCode: string; phoneNumber: string; call: Function }
  ): void {
    commit('insertPhoneNumber', payload.phoneNumber)
    commit('insertCountryCode', payload.countryCode)
    if (firebaseInstance != null) {
      firebaseInstance.setDetails(payload.countryCode, payload.phoneNumber)
      firebaseInstance.applyRecaptchaVerifier()
      payload.call()
    }
  },

  requestForCodeVerification({ state, commit }, code: string): void {
    if (state.phoneNumber != null && firebaseInstance != null) {
      firebaseInstance.signInWithVerificationCode(code, {
        success: result => {
          if (
            state.phoneNumber != null &&
            firebaseInstance != null &&
            firebaseInstance.phoneNumber != undefined
          ) {
            firebaseInstance
              .checkAccountExistance()
              .then(res => {
                if (res[0]) {
                  commit('setVerified', true)
                  commit('setToken', res[1])
                  this.$router.replace(URLS.successAtAccountCheck)
                } else {
                  commit('setVerified', false)
                  this.$router.replace(URLS.failureAtAccountCheck)
                }
              })
              .catch(err => {
                commit('setVerified', false)
                this.$router.replace(URLS.failureAtVerification)
              })
          }
        },
        error: error => {
          commit('setVerified', false)
          this.$router.replace(URLS.failureAtVerification)
        }
      })
    }
  },
  resendRequest({ state }): void {
    if (state.phoneNumber != null && firebaseInstance != null) {
      firebaseInstance.resetRecaptchaVerifier()
      this.$router.replace('/auth/fp/entry')
    }
  },

  changePassword(
    { state, commit },
    payload: { password: string; func: Function }
  ): void {
    if (
      state.token != undefined &&
      state.token.length > 0 &&
      firebaseInstance != null
    ) {
      payload.func()
      this.$axios
        .post(
          'auth/reset_password',
          JSON.stringify({ token: state.token, password: payload.password })
        )
        .then(res => {
          if (res.status === 202) {
            commit('reset')
            this.$router.replace('/auth/login')
          } else {
            this.$router.replace('/auth/fp/entry')
          }
        })
        .catch(err => {
          this.$router.replace('/auth/fp/verr')
        })
    } else {
      this.$router.replace('/auth/fp/entry')
    }
  }
}
