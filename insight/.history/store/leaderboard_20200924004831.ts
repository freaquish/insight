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
        state.users = data.users
    }
}

export const actions: ActionTree<RootState, RootState> = {
    fetch({ commit }, hobbies: string[]): void {
        const url = `leaderboard/score?hobbies=${hobbies.join('+')}`
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
    }
}