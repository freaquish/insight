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

    // Update progress of current uploading asset using for loop
    updateProgress(state: RootState, progress: ProgressMeter): void

    insertHobby(state: RootState, hobby: Hobby): void

    // Reset state to default
    reset(state: RootState): void

}

export const mutations: MutationTree<RootState> & Mutations = {
    insertHobbies(state, hobbies): void {
        state.hobby_list = hobbies.filter(h => {
            return h.name != undefined && h.name.length > 0 &&
                h.code_name.length > 0
        })
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
    },

    updateProgress(state, progress) {
        for (let index = 0; index < state.progression.length; index++) {
            if (state.progression[index].url === progress.url) {
                state.progression[index].progress = progress.progress
                break
            }
        }
    },
    insertHobby(state, hobby) {
        if (state.post === undefined) {
            state.post = new Post()
        }
        state.post.addHobby(hobby)
    },

    reset(state) {
        state.hobby_list = [] as Hobby[]
        state.post = undefined
        state.progression = [] as ProgressMeter[]
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
    },

    uploadFilesToFirebase({ commit, state }, func: Function): void {
        if (window.navigator.onLine && state.post != undefined) {
            const firestore = new StorageVaultBeta(state.post.getAssets())
            firestore.bulk_upload({
                progress: (progress: ProgressMeter) => {
                    commit('updateProgress', progress)
                },
                error: (err) => {
                    console.log(err);
                    // TODO: Error handline while upload
                }
            })
        }
    }
}