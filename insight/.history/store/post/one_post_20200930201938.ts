import { ActionTree, MutationTree } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = () => ({
    post: {} as OnePost
})

export type RootState = ReturnType<typeof state>

type Mutations = {

}

export const mutations: MutationTree<RootState> & Mutations = {

}

export const actions: ActionTree<RootState, RootState> = {


}