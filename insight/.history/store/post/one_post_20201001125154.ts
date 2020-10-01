import { ActionTree, MutationTree } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = () => ({
    post: {} as OnePost
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    insertComment(state: RootState, comment: Comment): void
    insertPostData(state: RootState, post: OnePost): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    insertComment(state, comment): void {

    },
    insertPostData(state, post): void {
        state.post = post
    }

}

export const actions: ActionTree<RootState, RootState> = {
    fetchPost({ commit }, post_id: string): void {

    },
    fetchComment({ commit, state }, post_id: string): void { },
    createComment({ commit }, post_id: string): void { }
}