import { ActionTree, MutationTree } from 'vuex'
import { Hobby, Leaderboard, RankCard } from '@/types/index'
import FrozenStorage from '@/static/js/local_storage'



export const state = (): Leaderboard => ({
    hobbies: [],
    users: [],
    selected: undefined
})



export type RootState = ReturnType<typeof state>

type Mutations = {
    setLeaderBoardData(state: RootState, data: {hobbies: Hobby[],scoreboards: RankCard[]}): void
    setSelectedHobby(state: RootState, hobby: Hobby): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setLeaderBoardData(state, data: {hobbies: Hobby[],scoreboards: RankCard[]}): void {
        if(data.hobbies.length > 0){
            state.hobbies = data.hobbies
        }
        state.users = data.scoreboards
    },
    setSelectedHobby(state: RootState, hobby: Hobby): void {
        state.selected = hobby
    },
}

export const actions: ActionTree<RootState, RootState> = {
    fetch({ commit }, hobbies: string[]): void {
        let url = `leaderboard/score?`
        if (hobbies.length > 0) {
            url = `${url}hobbies=${hobbies.join('+')}`
        }
        const storage = new FrozenStorage()
        if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
            this.$axios.setHeader('Authorization', storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            if (res.status === 200) {                
                commit('setLeaderBoardData', res.data)
            }
        })
    },
    fetchLeaderboard({commit, state}, payload: {hobbies?: Hobby[], sort?: string, search?: string}): void {
        let url = `leaderboard/score?`
        if(payload.hobbies != undefined && payload.hobbies.length > 0){
            commit('setSelectedHobby', payload.hobbies[0])
            url += `hobby=${payload.hobbies[0].code_name}&`
        }else if(state.selected != undefined){
            url += `hobby=${state.selected.code_name}&`
        }

        if(payload.sort != undefined){
            url+=`sort=${payload.sort}&`
        }
        if(payload.search != undefined){
            url += `search=${payload.search.replaceAll('@','')}&`
        }
        if(state.hobbies.length > 0){
            url += 'no_hobby'
        }

        if(this.$axios.defaults.headers.common['Authorization'] === undefined){
            const storage = new FrozenStorage()
            this.$axios.setToken(storage.get('token'))
        }

        this.$axios.get(url).then(res=> {
            if(res.status === 200){
                commit('setLeaderBoardData', res.data)
            }
        })
    }
}