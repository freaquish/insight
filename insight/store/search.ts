import { ActionTree, MutationTree } from 'vuex'
import { SearchResult, Tag, Hobby, User } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'


export const state = (): SearchResult => ({
    tags: [] as Tag[],
    users: [] as User[],
    hobbies: [] as Hobby[]
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    setSearchResult(state: RootState, results: SearchResult): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setSearchResult(state, results): void {
        state.tags = results.tags
        state.users = results.users
        state.hobbies = results.hobbies
    }
}

export const actions: ActionTree<RootState, RootState> = {
    search({ commit }, text: string) {
        let query = (text.replaceAll('#', 'h__')).replaceAll('@', 'a__').replaceAll(' ', '+')
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
    }
}