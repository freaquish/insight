import { ActionTree, MutationTree } from 'vuex'
import { Notification } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'


export const state = (): Notification => ({
    header: undefined,
    avtar: undefined,
    body: undefined,
    time: undefined,
    alert: 0,
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    setNotificationData(state: RootState, data: Notification): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setNotificationData(state, data): void {
        state.header = data.header
        state.avtar = data.avtar
        state.body = data.body
        state.time = data.time
        state.alert = data.alert
    }
}

export const actions: ActionTree<RootState, RootState> = {
    fetch({ commit }): void {
        let url = `notification?`
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            if (res.status === 200) {
                commit('setNotificationData', res.data)
            }
        })
    }
}
