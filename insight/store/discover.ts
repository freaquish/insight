import {ActionTree, MutationTree} from 'vuex'
import {Hobby, DiscoverPost} from "@/types/index"


export const state = () => ({
    posts: [] as DiscoverPost[],
    hobbies: [] as Hobby[],
    next_link: '' as string
})

type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}