import { ActionTree, MutationTree } from 'vuex'
import { Post } from '@/types/CreatePost'
import { Hobby } from '@/types/index'
import { StorageVaultBeta } from '@/plugins/FirebasePlugin.js'
import FrozenStorage from '@/static/js/local_storage'


// URLS to route whenever any noted condition is met
const URLS = {
    error: '',
    success: '/'
}

// Interface will store data of every url stored with progress and type
// After finishing they will replace assets accordingly
interface ProgressMeter {
    url: string
    type: string
    progress: number
}

export const state = () => ({
    hobby_list: [] as Hobby[],
    post: undefined as Post | undefined,
    progression: [] as ProgressMeter[]
})

export type RootState = ReturnType<typeof state>

type Mutations = {
    // Insert Hobby list in store for hobby_window
    insertHobbies(state: RootState, hobbies: Hobby[]): void
    inertTextData(state: RootState, payload: { data: string, fontName: st })
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
                commit('insertHobbies', [])
            }
        })
    }
}