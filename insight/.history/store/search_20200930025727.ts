import { ActionTree, MutationTree } from 'vuex'
import { SearchResult, SearchQuery } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'
import { User } from 'firebase'


export const state = (): SearchResult => ({
    tags: [],
    users: [],
    hobbies: []
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    setSearchResult(state: RootState, results: SearchResult): void
    followedUser(state: RootState, aid: string): void
    clear(state: RootState): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setSearchResult(state, results): void {
        state.tags = results.tags
        state.users = results.users
        state.hobbies = results.hobbies
    },
    followedUser(state, aid): void {
        state.users.forEach((acc, index) => {
            if (aid === acc.account_id) {
                state.users[index].following = 1
            }
        })
    },
    clear(state): void {
        state.tags = []
        state.users = []
        state.hobbies = []
    }
}

export const actions: ActionTree<RootState, RootState> = {
    search({ commit }, text: string) {
        let query = text.replace(/#/gi, 'h__').replace(/@/gi, 'a__').replace(/\s/gi, '+')
        const storage = new FrozenStorage()
        const url = `search/?q=${query}`
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            if (res.status === 200) {
                commit('setSearchResult', res.data)
            }
        })
    },

}