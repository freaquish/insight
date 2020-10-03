import { ActionTree, MutationTree } from 'vuex'
import { CreatePost, Post } from '@/types/CreatePost'
import { Hobby } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'


export const state = () => ({
    hobby_list: [] as Hobby[],
    post: undefined as Post | undefined,

})

export type RootState = ReturnType<typeof state>

type Mutations = {
    // Insert Hobby list in store for hobby_window
    insertHobbies(state: RootState, hobbies: Hobby[]): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    insertHobbies(state, hobbies): void {
        state.hobby_list = hobbies
    }
}


export const actions: ActionTree<RootState, RootState> = {
    fetchHobbies: function ({ commit }): void {

    }
}