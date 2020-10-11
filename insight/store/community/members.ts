import { ActionTree, MutationTree } from 'vuex'
import { Members } from '@/types/index'
import FrozenStorage from '~/static/js/local_storage'
import { avatarDefault } from '~/static/js/assets'

export const state = (): Members => ({
    team: [],
    members: [],
    loading: false,
    username: undefined
  })

export type RootState = ReturnType<typeof state>

type Mutations = {
    setMembersData(state: RootState, data: Members): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setMembersData(state, data): void {
        state.team = data.team
        state.members = data.members
        },
    setLoading(state, value): void {
        state.loading = value
        },
    setAccount(state, data): void {
        state.username = data
        }
}


export const actions: ActionTree<RootState, RootState> = {
    fetchMembers({ commit }, req): void {
    commit('setLoading', true)
    let url
    if (state.username != undefined) {
      url = `association/community/third/members/${req}?username=${state.username}`
    } else {
      url = `association/community/members/${req}`
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
          commit('setMembersData', res.data)
          commit('setLoading', false)
        }
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
        this.$router.push('/auth/login')
      })
    },

    teamview({ commit, state }, payload) {
        const storage = new FrozenStorage()
        let token = storage.get('token')
        if (token == null) {
          this.$router.push('/auth/login')
        } else {
          this.$axios.setHeader('Authorization', token)
        }
        this.$axios.get(`association/team/${payload.team}`).then(res => {
          payload.onComplete()
        })
      }
}