import { ActionTree, MutationTree } from 'vuex'
import { CreatePost, Post } from '@/types/CreatePost'
import FrozenStorage from '@/static/js/local_storage'

export const state = () => ({

})

export type RootState = ReturnType<typeof state>

type Mutations = {}

export const mutations: MutationTree<RootState> & Mutations = {}