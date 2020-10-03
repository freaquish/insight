import { ActionTree, MutationTree } from 'vuex'
import { Post } from '@/types/CreatePost'
import { Assets, Hobby, TextAsset } from '@/types/index'
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

    // Insert text asset in post
    insertTextData(state: RootState, payload: TextAsset): void

    // Insert assets as images, video. audio in post
    insertAssets(state: RootState, payload: Assets): void

    insertCaption(state: RootState, caption: string): void

}

export const mutations: MutationTree<RootState> & Mutations = {
    insertHobbies(state, hobbies): void {
        state.hobby_list = hobbies
    },

    insertTextData(state, payload): void {
        if (state.post === undefined) {
            state.post = new Post()
        }
        state.post.addText(payload)
    },

    insertAssets(state, payload): void {
        if (state.post === undefined) {
            state.post = new Post()
        }
        if (payload.images != undefined) {
            payload.images.forEach((image, index) => {
                if (state.post != undefined) {
                    state.post.addImage(image)
                }
            })
        }

        if (payload.video != undefined) {
            state.post.addVideo(payload.video)
        }

        if (payload.audio != undefined) {
            state.post.addAudio(payload.audio)
        }
    },

    insertCaption(state, caption) {
        if (state.post != undefined) { state.post.addCaption(caption) }
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