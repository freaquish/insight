import { ActionTree, MutationTree } from 'vuex'
import { Leaderboard } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = (): Leaderboard => ({
    hobbies: [],
    ranked_users: [],
    selected: undefined
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    setLeaderBoardData(state: RootState, data: Leaderboard): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setLeaderBoardData(state, data): void { }
}

export const actions: ActionTree<RootState, RootState> = {

}