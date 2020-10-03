import { ActionTree, MutationTree } from 'vuex'
import { Post } from '@/types/CreatePost'
import { Hobby } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'


// URLS to route whenever any noted condition is met
const URLS = {
    error: '',
    success: '/'
}


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
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            const storage = new FrozenStorage()
            this.$axios.setToken(storage.get('token'))
        }
        this.$axios.get('fetch_hobby').then(res => {
            if (res.status === 200) {
                commit('insertHobbies', res.data.hobbies)
            } else {
                commit('insertHobbies', [] as Hobby[])
            }
        })
    }
}