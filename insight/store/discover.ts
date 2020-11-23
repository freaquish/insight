import {ActionTree, MutationTree} from 'vuex'
import {Hobby, DiscoverPost} from "@/types/index"
import FrozenStorage from '~/static/js/local_storage'


export const state = () => ({
    posts: [] as DiscoverPost[],
    hobbies: [] as Hobby[],
    next_link: '' as string
})

type RootState = ReturnType<typeof state>

interface Payload {
    posts: DiscoverPost[]
    links: {
        next: string
        previous: string
    },
    hobbies: Hobby[]
}

export const mutations: MutationTree<RootState> = {
    setData(state: RootState, payload: Payload): void{
        state.posts = payload.posts
        state.hobbies = payload.hobbies
        state.next_link = payload.links.next
    }
}

export const actions: ActionTree<RootState, RootState> = {
    fetchDiscover({state, commit}, hobby: string | undefined): void {
        let url = 'discover?'
        if(state.hobbies.length > 0){
            url +='no_hobby&'
        }
        if(hobby != undefined){
            url += `hobby=${hobby}`
        }
        if(this.$axios.defaults.headers.common['Authorization'] === undefined){
            const storage = new FrozenStorage()
            this.$axios.setToken(storage.get('token'))
        }
        this.$axios.get(url).then(res => {
            
        })
    }
}