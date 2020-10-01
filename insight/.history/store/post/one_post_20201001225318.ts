import { ActionTree, MutationTree } from 'vuex'
import { OnePost, Comment } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'
import { avatarDefault } from '@/static/js/assets'



export const state = () => ({
    post: {} as OnePost
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    insertComments(state: RootState, comments: Comment[]): void
    insertPostData(state: RootState, post: OnePost): void
    insertSingleComment(state: RootState, comment: Comment): void
    updateActionOnePost(state: RootState, action: string): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    insertComments(state, comments): void {
        state.post.footer.comments = comments
    },
    insertPostData(state, post): void {
        state.post = post
        if (state.post.header.avatar.length === 0) {
            state.post.header.avatar = avatarDefault
        }
    },
    insertSingleComment(state, comment): void {
        state.post.footer.comments.push(comment)
    },
    updateActionOnePost(state, action): void {
        if (action === 'love' || action === 'un_love') {
            state.post.footer.action_map.love += (state.post.meta.actions.loved === 1) ? - 1 : 1
            state.post.meta.actions.loved = (state.post.meta.actions.loved === 1) ? 0 : 1
        } else if (action === 'view' && state.post.meta.actions.viewed === 0) {
            state.post.footer.action_map.view += 1
            state.post.meta.actions.viewed = 1
        } else if (action === 'share') {
            state.post.footer.action_map.share += 1
            state.post.meta.actions.shared = 1
        }
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

    createComment({ commit }, payload: { post_id: string, comment: string, complete: Function }): void {
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setToken(storage.get('token'))
        }
        this.$axios.post('post/micro_action',
            JSON.stringify({ action: 'comment', pid: payload.post_id, comment: payload.comment })).then(res => {
                commit('insertComments', res.data.comments)
                payload.complete()
            })
    }
}