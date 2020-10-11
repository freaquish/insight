import { ActionTree, MutationTree } from 'vuex'
import { CommunityPage } from '@/types/index'
import FrozenStorage from '~/static/js/local_storage'
import { StorageVaultBeta } from '~/plugins/FirebasePlugin'




export const state = (): CommunityPage => ({
    banner: undefined,
    communityName: undefined,
    communityTag: undefined,
    description: undefined,
    team: 0,
    members: 0,
    feeds: [],
    loading: false
})


export type RootState = ReturnType<typeof state>


type Mutations = {
    setCommunityPageData(state: RootState, data: CommunityPage): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setCommunityPageData(state, data): void {
        state.communityName = data.communityName
        state.communityTag = data.communityTag
        state.description = data.description
        state.team = data.team
        state.members = data.members
        state.feeds = data.feeds
    },
    setLoadingState(state, loading): void {
        state.loading = loading
      },
}

export const actions: ActionTree<RootState, RootState> = {
    fetchCommunityData({state, commit}): void {
        commit('setLoadingState', true)
        let url = `community/page?`
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            if (res.status === 200) {
                commit('setCommunityPageData', res.data)
            }else {
                commit('setLoadingState', false) 
            }
        })
        .catch(error => {
            commit('setLoadingState', false)
            commit('setErrorState', true)
          })
    }
}