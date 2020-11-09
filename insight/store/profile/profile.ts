import FrozenStorage from '~/static/js/local_storage'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { StorageVaultBeta } from '~/plugins/FirebasePlugin'
import { avatarDefault } from '~/static/js/assets'
import { CollectionPost } from '@/types/index'

interface StoreData {
  collections: CollectionPost[]
  editable: boolean
  following: number
  followers: number
  account_id?: string
  avatar: string
  firstName?: string
  lastName?: string
  username?: string
  isFollowing: boolean
  description?: string
  hobbies: string[]
  loading: boolean,
}

export const state = (): StoreData => ({
  collections: [] as CollectionPost[],
  editable: false,
  following: 0,
  followers: 0,
  account_id: undefined,
  firstName: undefined,
  username: undefined,
  lastName: undefined,
  isFollowing: false,
  description: undefined,
  avatar: avatarDefault,
  loading: false,
  hobbies: [] as string[],
})

type RootState = ReturnType<typeof state>

interface ProfileData {
  account_id?: string
  avatar?: string
  description?: string
  following_count?: number
  follower_count?: number
  following?: number
  first_name?: string
  last_name?: string
  username?: string
  posts?: CollectionPost[]
  hobbies: string[]
}

type Mutation = {
  // Set Profile Data in the store
  insertProfileData(state: RootState, payload: ProfileData): void

  //Set Loading State to enable or disable loading animation
  setLoadingState(state: RootState, loading: boolean): void

  //Set Avatar for changing avatar when editable
  setAvatar(state: RootState, url: string): void

  setDescription(state: RootState, description: string): void

  setEditability(state: RootState, editable: boolean): void

  setName(state: RootState, name: { firstName: string; lastName: string }): void

  setFollowing(state: RootState, following: boolean): void

  insertPosts(state: RootState, posts: CollectionPost[]):void

  reset(state: RootState): void
}

export const getters: GetterTree<RootState, RootState> = {
  fullName(state: RootState): string {
    return state.firstName + ' ' + state.lastName
  },
  renderedDescription(state: RootState): string {
    let text = state.description || ''
      let match = text.match(/@[a-z0-9_?]+|#[a-z0-9_?]+/gi) || [] as string[]
      for (let index = 0; index < match.length; index++) {
        if (match[index].includes('#')) {
          text = text.replace(
            match[index],
            `<span class="font-montserrat text-blue-500 italic">${match[index]}</span>`
          )
        } else if (match[index].includes('@')) {
          text = text.replace(
            match[index],
            `<span class="font-montserrat text-blue-700">${match[index]}</span>`
          )
        }
      }
      return text
  }
}

export const mutations: MutationTree<RootState> & Mutation = {
  insertProfileData: function(state, payload) {
    state.account_id = payload.account_id
    state.avatar = avatarDefault
    if (payload.avatar != undefined && payload.avatar.length > 2) {
      state.avatar = payload.avatar
    }
    state.description = payload.description
    state.following =
      payload.following_count != undefined ? payload.following_count : 0
    state.followers =
      payload.follower_count != undefined ? payload.follower_count : 0
    state.isFollowing = payload.following === 1 ? true : false
    state.firstName = payload.first_name
    state.lastName = payload.last_name
    state.username = payload.username
    state.hobbies = payload.hobbies as string[]
    state.collections =
      payload.posts != undefined ? payload.posts : ([] as CollectionPost[])
  },

  setLoadingState: function(state, loading) {
    state.loading = loading
  },
  setAvatar: function(state, url) {
    state.avatar = url
  },
  setDescription: function(state, desc) {
    state.description = desc
  },
  setName: function(state, name) {
    state.firstName = name.firstName
    state.lastName = name.lastName
  },
  setEditability: function(state, edit) {
    state.editable = edit
  },
  setFollowing: function(state, val) {
    state.isFollowing = val
  },

  insertPosts(state, posts): void {
    state.collections = posts
  },
  reset(state): void {
    state.collections = [] as CollectionPost[]
    state.editable = false
    state.following = 0
    state.followers = 0
    state.account_id = undefined
    state.firstName = undefined
    state.username = undefined
    state.lastName = undefined
    state.isFollowing = false
    state.description = undefined
    state.avatar = avatarDefault
    state.loading = false
    state.hobbies = [] as string[]
  }
}

export const actions: ActionTree<RootState, RootState> = {

  fetchProfile: function({ state, commit }, func) {
    commit('setLoadingState', true)
    let storage = new FrozenStorage()
    let token = storage.get('token')
    const url = `profile`
    if (token != null) {
      this.$axios.setHeader('Authorization', token)
      this.$axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            commit('insertProfileData', res.data)
            commit('setEditability', true)
            commit('setLoadingState', false)
            func()
          }
        })
        .catch(error => {
          commit('setLoadingState', false)
        })
    } else {
      this.$router.push('/auth/login')
    }
  },

  // Update profile changes
  async updateProfileData({ commit }, payload): Promise<void> {
    let data = { ...payload }
    commit('setLoadingState', true)
    const storage = new FrozenStorage()
    let token = storage.get('token') as string | null
    const url = `profile`
    if (token === null) {
      this.$router.push('/auth/login')
    } else {
      this.$axios.setHeader('Authorization', token)
      this.$axios
        .post(url, JSON.stringify(data))
        .then(res => {
          if (res.status === 202) {   
            commit('insertProfileData', res.data)
            commit('setEditability', true)
            commit('setLoadingState', false)
          }
        })
        .catch(error => {
          commit('setLoadingState', false)
        })
    }
  },

  uploadImageToFirebase: function({ state, commit, dispatch }, payload) {
    if (window.navigator.onLine) {
      let storage = new StorageVaultBeta()
      storage.init(
        { images: [payload.src] },
        {
          complete: assets => {
            if (assets.images != undefined) { 
              dispatch('updateProfileData', { avatar: assets.images[0] })
              payload.func()
            }
          },
          progress: progress => {},
          error: () => {}
        }
      )
      storage.bulkUpload()
    }
  },

  fetchUserPost({state,commit}, username?: string): void {
    let url = `profile/post/${username === undefined? state.username: username}`
    if( this.$axios.defaults.headers.common['Authorization'] === undefined){
      const storage = new FrozenStorage()
      this.$axios.setToken(storage.get('token'))
    }
    this.$axios.get(url).then(res => {
      if(res.status === 200){
        commit('insertPosts', res.data.posts)
      }
    })
  },

  fetchThirdProfile: function({ state, commit }, load: {aid: string, func: Function}) {
    commit('setLoadingState', true)
    const storage = new FrozenStorage()
    let token = storage.get('token') as string
    const url = `profile/third/${load.aid}`
    if (token != null) {
      this.$axios.setHeader('Authorization', token)
    }
    this.$axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          if (res.data.self != undefined && res.data.self === 1) {
            this.$router.replace('/profile/self')
          } else {
            commit('insertProfileData', res.data.data)
            commit('setEditability', res.data.self === 1)
            commit('setLoadingState', false)
            load.func()
          }
        }
      })
      .catch(error => {
        commit('setLoadingState', false)
      })
  }
}
