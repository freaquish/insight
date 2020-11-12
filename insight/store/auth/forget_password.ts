import {MutationTree, ActionTree, Store} from  'vuex'
import {FirebaseAuthentication}  from '@/plugins/FirebasePlugin'



export const state = () => ({
    phoneNumber: null as string | null,
    countryCode: '91' as string,
    verified: false as boolean
})



type RootState = ReturnType<typeof state>

var firebaseInstance = null as FirebaseAuthentication | null

const URLS = {
    successAtAccountCheck: '/auth/register',
    failureAtAccountCheck: '',
    successAtVerification: '/auth/fp/otp_in',
    failureAtVerification: '',
}

export const mutations: MutationTree<RootState> = {
    insertCountryCode(state: RootState, code:string){
        state.countryCode = code
    },
    insertPhoneNumber(state: RootState, number: string) {
        state.phoneNumber = number
    }
}

export const actions: ActionTree<RootState, RootState> = {
    requestForVerification({state, commit}, payload: {captchaContainer: string, countryCode: string, phoneNumber: string}): void {
        commit('insertPhoneNumber',payload.phoneNumber)
        commit('insertCountryCode',payload.countryCode)
        firebaseInstance = new FirebaseAuthentication(this.$axios)
        firebaseInstance.setDeviceLanguage()
        firebaseInstance.setRecaptchaVerifier(
            payload.captchaContainer, payload.countryCode, payload.phoneNumber, undefined, () => {
                this.$router.push(URLS.successAtVerification)
            }
        )
        firebaseInstance.applyRecaptchaVerifier()
    },

    requestForCodeVerification({state}, code: string): void {
        if( state.phoneNumber != null && firebaseInstance != null){
            firebaseInstance.signInWithVerificationCode(code, {
                success: (result) => {
                    if(state.phoneNumber != null && firebaseInstance != null){
                        firebaseInstance.checkAccountExistance(state.phoneNumber).then(res => {
                            this.$router.replace(URLS.successAtAccountCheck)
                        })
                    }
                },
                error: (error) => {}
            })
        }
    },
    resendRequest({state}): void {
        if(state.phoneNumber != null && firebaseInstance != null){
            firebaseInstance.resetRecaptchaVerifier()
            this.$router.replace('/auth/fp/entry')
        }
    }
}

