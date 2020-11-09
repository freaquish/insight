import FrozenStorage from '~/static/js/local_storage'
import { avatarDefault } from '~/static/js/assets'

export const state = () => ({
  followers: [],
  followings: [],
  loading: false,
  username: undefined
})

export const mutations = {
  setState: function(state, payload) {
    state.followers = payload.followers
    state.followings = payload.followings
  },
  setLoading: function(state, value) {
    state.loading = value
  },
  setAccount: function(state, data) {
    state.username = data
  },
  resetFollows(state){
    state.followers = []
    state.followings = []
    state.username = undefined
  }
}

export const actions = {
  fetchFollows: function({ state, commit }, req) {
    commit('setLoading', true)
    let url
    if (state.username != undefined) {
      url = `association/profile/third/follows/${req}?username=${state.username}`
    } else {
      url = `association/profile/follows/${req}`
      const storage = new FrozenStorage()
      let token = storage.get('token')
      if (token == null) {
        this.$router.push('/auth/login')
      } else {
        this.$axios.setHeader('Authorization', token)
      }
    }

    this.$axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          commit('setState', res.data)
          commit('setLoading', false)
        }
      })
      .catch(err => {
        commit('setLoading', false)
        this.$router.push('/auth/login')
      })
  },

  followactions({ commit, state }, payload) {
    const storage = new FrozenStorage()
    let token = storage.get('token')
    if (token == null) {
      this.$router.push('/auth/login')
    } else {
      this.$axios.setHeader('Authorization', token)
    }
    this.$axios.get(`association/follow/${payload.aid}`).then(res => {
      payload.onComplete()
    })
  }
}
