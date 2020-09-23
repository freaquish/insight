import { ActionTree, MutationTree } from 'vuex'
import { Leaderboard } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = (): Leaderboard => ({
    hobbies: [],
    users: [],
    selected: undefined
})



export type RootState = ReturnType<typeof state>

type Mutations = {
    setLeaderBoardData(state: RootState, data: Leaderboard): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setLeaderBoardData(state, data): void {
        state.hobbies = data.hobbies
        state.selected = data.selected
        if (state.selected != undefined) {
            let index = state.hobbies.indexOf(state.selected)
            let hobbies = [state.selected].concat(state.hobbies.slice(0, index)).concat(state.hobbies.slice(index + 1))
            console.log(state.hobbies.slice(0, index), index, state.hobbies.slice(index + 1))
        }
        state.users = data.users
    }
}

export const actions: ActionTree<RootState, RootState> = {
    fetch({ commit }, hobbies: string[]): void {
        let url = `leaderboard/score?`
        if (hobbies.length > 0) {
            url = `${url}hobbies=${hobbies.join('+')}`
        }
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            if (res.status === 200) {
                commit('setLeaderBoardData', res.data)
            }
        })
    }
}