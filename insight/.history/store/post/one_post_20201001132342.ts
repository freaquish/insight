import { ActionTree, MutationTree } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = () => ({
    post: {} as OnePost
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    insertComments(state: RootState, comments: Comment[]): void
    insertPostData(state: RootState, post: OnePost): void
    insertSingleComment(state: RootState, comment: Comment): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    insertComments(state, comments): void {
        state.post.footer.comments = comments
    },
    insertPostData(state, post): void {
        state.post = post
    },
    insertSingleComment(state, comment): void {
        state.post.footer.comments.push(comment)
    }

}

export const actions: ActionTree<RootState, RootState> = {
    fetchPost({ commit }, post_id: string): void {
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setToken(storage.get('token'))
        }
        this.$axios.get(`post/${post_id}`).then(res => {
            if (res.status === 200) {
                commit('insertPostData', res.data.post)
            }
        })
    },
    fetchComment({ commit }, post_id: string): void {
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setToken(storage.get('token'))
        }
        this.$axios.get(`post/comments/${post_id}`).then(res => {
            if (res.status === 200) {
                commit('insertComments', res.data.comments)
            }
        })
    },
    createComment({ commit }, post_id: string): void { }
}