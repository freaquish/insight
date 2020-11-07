import { ActionTree, MutationTree } from 'vuex'
import { Post } from '@/types/CreatePost'
import { Assets, Hobby, TextAsset } from '@/types/index'
import { StorageVaultBeta, ProgressAsset } from '@/plugins/FirebasePlugin'
import FrozenStorage from '@/static/js/local_storage'

// URLS to route whenever any noted condition is met
const URLS = {
  error: '',
  success: '/'
}

export const state = () => ({
  hobby_list: [] as Hobby[],
  post: undefined as Post | undefined,
  progression: [] as ProgressAsset[]
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
  updateProgress(state: RootState, progress: ProgressAsset[]): void

  insertHobby(state: RootState, hobby: Hobby): void

  // Reset state to default
  reset(state: RootState): void

  resetAssets(state: RootState): void
}

export const mutations: MutationTree<RootState> & Mutations = {
  resetAssets(state): void {
    if (state.post != undefined) state.post.resetAssets()
  },

  insertHobbies(state, hobbies): void {
    state.hobby_list = hobbies.filter(h => {
      return h.name != undefined && h.name.length > 0 && h.code_name.length > 0
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
    if (state.post != undefined) {
      state.post.addCaption(caption)
    }
  },

  updateProgress(state, progression) {
    state.progression = JSON.parse(JSON.stringify(progression))
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
    state.progression = [] as ProgressAsset[]
  }
}

export const actions: ActionTree<RootState, RootState> = {
  fetchHobbies: function({ commit }): void {
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
    let self = this
    if (window.navigator.onLine && state.post != undefined) {
      const firestore = new StorageVaultBeta()
      let assets = state.post.getAssets()
      firestore.init(JSON.parse(JSON.stringify(assets)), {
        complete: function(data) {
          commit('insertAssets', data)
          func()
        },
        progress: function(array) {
          console.log(array)
          commit('updateProgress', array)
        },
        error: function(error: Error) {
          // TODO: Failed
        }
      })
      firestore.bulkUpload()
    }
  },

  sendDataToServer({ state, commit }): void {
    console.log('Putting Post on server', state.post)

    if (state.post != undefined) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
          if (state.post != undefined) {
            state.post.addCoords({
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
          }
        })
      }
      const url = 'post/create'
      if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
        const storage = new FrozenStorage()
        let token = storage.get('token')
        if (token === null || token === undefined) {
          this.$router.replace('/auth/login')
        } else {
          this.$axios.setToken(token)
        }
      }
      this.$axios
        .post(url, JSON.stringify(state.post.renderToData(true)))
        .then(res => {
          if (res.status === 201) {
            console.log(res)

            commit('reset')
            this.$router.push('/')
          } else {
            //TODO: Create Post failed error handling
          }
        })
    }
  },
  createPost({ state, dispatch }) {
    if (
      state.post != undefined &&
      JSON.stringify(state.post.getAssets()) != '{}'
    ) {
      console.log(state.post.renderToData(true))
      dispatch('uploadFilesToFirebase', () => {
        dispatch('sendDataToServer')
      })
    } else {
      dispatch('sendDataToServer')
    }
  }
}
