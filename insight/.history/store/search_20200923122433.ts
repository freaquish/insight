import { ActionTree, MutationTree } from 'vuex'
import { SearchResult, Tag, Hobby, User } from '@/types/index'


export const state = (): SearchResult => ({
    tags: [] as Tag[],
    users: [] as User[],
    hobbies: [] as Hobby[]
})

export type RootState = ReturnType<typeof state>


export const mutations: MutationTree<RootState> = {

}

export const actions: ActionTree<RootState, RootState> = {

}