import { ActionTree, MutationTree } from 'vuex'
import { SearchResult, Tag, Hobby, User } from '@/types/index'


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

    }
}