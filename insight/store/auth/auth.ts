import { ActionTree, MutationTree } from 'vuex'
import FrozenStorage from '@/static/js/local_storage'


export const state = () => ({
    oldPassword: null as string | null,
    newPassword: null as string | null,
    errorInChangePassword: false as boolean
})


export type RootState = ReturnType<typeof state>

type Mutations = {
    // Set oldPassword and new Password data for changing Password
    setChangePasswordData(state: RootState, payload: {oldPassword: string, newPassword: string}): void

    //Reset Change password Data to defauls
    resetChangePasswordData(state: RootState): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setChangePasswordData(state, payload): void {
        state.oldPassword = payload.oldPassword
        state.newPassword = payload.newPassword
    },
    resetChangePasswordData(state): void {
        state.oldPassword = null
        state.newPassword = null
        state.errorInChangePassword = false
    }
}

export const actions: ActionTree<RootState, RootState> = {
    changePassword({state, commit}):void {
        const storage = new FrozenStorage()
        let token = storage.get('token')
        if(state.oldPassword != null && state.newPassword != null && token != null){
            state.errorInChangePassword = false
            if(this.$axios.defaults.headers.common['Authorization'] === undefined){
                this.$axios.setToken(storage.get('token'))
            }
            this.$axios.post('auth/change_password', JSON.stringify({old_password: state.oldPassword, new_password: state.newPassword})).then(res => {
                console.log(res.status)
                if(res.status === 202){
                    storage.set('token',`Token ${res.data['token']}`)
                    commit('resetChangePasswordData')
                    this.$router.replace('/')
                }else{
                    
                   
                }
            }).catch(err => {
                state.errorInChangePassword = true
                let faulcy = JSON.parse(storage.get('fault_attempts'))
                if(faulcy == null){
                    storage.set('fault_attempts', '1')
                }else if(faulcy === 2) {
                    storage.remove('fault_attempts')
                    storage.logOut()
                    this.$router.replace('/auth/login')
                }else{
                    storage.set('fault_attempts', JSON.stringify(JSON.parse(faulcy) + 1))
                    
                }

            })
        }
    }
}