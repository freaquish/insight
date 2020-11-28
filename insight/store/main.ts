import {MutationTree, ActionTree} from "vuex"
import { avatarDefault } from "~/static/js/assets"
import FrozenStorage from "~/static/js/local_storage"
import { OnePost } from "~/types"

export const state = () => ({
    firstName: 'Welcome' as string,
    avatar: avatarDefault,
    links: {
        next: null as string | null,
        previous: null as string | null
    },
    nextFetchIndex: [] as number[],
    posts: [] as OnePost[],
    loading: false as boolean,
    error: false as boolean,
    onePost: {} as OnePost
})


type RootState = ReturnType<typeof state>

interface Payload {
    links: {
        next: string | null,
        previous: string | null
    },
    posts: OnePost[],
    meta: {
        avatar: string,
        first_name: string
    },
    len: number,
    notifications: number
}

type Muatations = {
    // Set Account Data in the state from meta
    setAccountData(state: RootState, payload: {first_name?: string, avatar?: string}): void
   
    // Set Posts in state and update next fetch index 
    setPosts(state: RootState, payload: Payload):void

    //remove fetch index from netxFetchIndex
    removeFromNextFetchIndex(state: RootState, index: number): void 

    // One Post data in state
    setPostData(state: RootState, payload: OnePost): void

    //Update Actions of the given post for creating realtime effect unl;ess we find soln
    updateActions(state: RootState, payload: {pid: string, action: string}): void

    // Update Association link in realtime effect
    updaetAssociation(state: RootState, payload: {aid: string, action: string}): void
}


export const mutations : Muatations & MutationTree<RootState> = {
    setAccountData(state, payload): void {
        state.firstName = payload.first_name || 'Welcome'
        state.avatar = avatarDefault
        if(payload.avatar != undefined && payload.avatar.length > 0){
            state.avatar = payload.avatar
        }
    },

    setPosts(state, payload): void {
        state.links = payload.links
        if(state.links.next != null){
            state.posts = state.posts.concat(payload.posts)
            state.nextFetchIndex.push(state.posts.length - 1)
        }else{
            state.posts = payload.posts
            state.nextFetchIndex = [] as number[]
        }
    },

    removeFromNextFetchIndex(state, index): void {
        state.nextFetchIndex = state.nextFetchIndex.filter((value, ind) => value != index)
    },

    setPostData(state, post):void {
        state.onePost = post
    },

    updateActions(state, payload): void {
        state.posts.forEach((post, index) => {
            if(post.post_id === payload.pid){
                switch(payload.action){
                    case "love":
                        post.footer.action_map["love"] += 1
                        post.meta.actions["loved"] = 1
                        break
                    case "un_love":
                        post.footer.action_map["love"] -= 1
                        post.meta.actions["loved"] = 0
                        break
                    case "share":
                        post.footer.action_map["share"] += 1
                        post.meta.actions["shared"] = 1
                        break
                }
                Object.assign(state.posts[index], post)
            }
        })
    },

    updaetAssociation(state, payload): void {
        state.posts.forEach((post, index) => {
            if(post.meta.account_id === payload.aid){
                post.header.following = payload.action === "follow"? 1 : 0
                Object.assign(state.posts[index], post)
            }
        })
    }
}


export const actions: ActionTree<RootState, RootState> = {
    fetchFeed({state, commit}, index? : number): void {
        let url = 'feed'
        if(index != undefined && state.links.next != null && state.nextFetchIndex.includes(index)){
            url = url + `${state.links.next}`
            commit('removeFromNextFetchIndex', index)
        }

        if(this.$axios.defaults.headers.common["Authorization"] === undefined){
            const storage = new FrozenStorage()
            let token = storage.get('token')
            if(token === null){
                storage.logOut()
                this.$router.replace('/auth/login')
            }else {
                this.$axios.setToken(token)
            }
        }

        this.$axios.get(url).then(res => {
            if(res.status === 200) {
                if(res.data.posts.length === 0){
                    this.$router.replace('/discover_hobby')
                }else{
                    commit('setAccountData', res.data.meta)
                    commit('setPosts', res.data)
                }
            }
        })
    },

    fetchPost({state, commit}, payload: {pid: string, func: Function}):void {
        commit('setPostData', {})
        let url = `post/${payload.pid}`
        if(this.$axios.defaults.headers.common["Authorization"] === undefined){
            const storage = new FrozenStorage()
            let token = storage.get('token')
            if(token === null){
                storage.logOut()
                this.$router.replace('/auth/login')
            }else{
                this.$axios.setToken(token)
            }
        }

        this.$axios.get(url).then(res => {
            commit('setPostData', res.data)
            payload.func()
        })
    }
}