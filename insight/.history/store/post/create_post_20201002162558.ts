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
    insertHobbies(hobby: Hobby[]): void
}

export const mutations: MutationTree<RootState> & Mutations = {}


export const actions: ActionTree<RootState, RootState> = {}