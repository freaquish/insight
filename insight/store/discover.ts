import { ActionTree, MutationTree } from 'vuex'
import { Hobby, OnePost } from '@/types/index'
import FrozenStorage from '~/static/js/local_storage'
// import { Post } from '~/types/CreatePost'

export const state = () => ({
  posts: [] as OnePost[],
  hobbies: [] as Hobby[],
  next_link: '' as string,
  selected: undefined as Hobby | undefined,
  nextFetchs: [] as number[],
  scrollPostition: undefined as string| number | undefined
})

type RootState = ReturnType<typeof state>

interface Payload {
  posts: OnePost[]
  links: {
    next: string
    previous: string
  }
  hobbies: Hobby[]
}

export const mutations: MutationTree<RootState> = {
  setData(state: RootState, payload: Payload): void {
    state.posts = payload.posts
    if (payload.hobbies.length > 0) {
      state.hobbies = payload.hobbies
    }
    if (payload.links.next != null) {
      state.next_link = payload.links.next
    }
    if (
      state.posts.length > 0 &&
      state.next_link != null &&
      state.next_link.length > 0
    ) {
      state.nextFetchs.push(state.posts.length - 1)
    }
    // console.log(state);
  },
  addNextPosts(state: RootState, payload: Payload): void {
    if (payload.links.next != null) {
      state.next_link = payload.links.next
    }
    for (let post of payload.posts) {
      state.posts.push(post)
    }
    if (
      state.posts.length > 0 &&
      state.next_link != null &&
      state.next_link.length > 0
    ) {
      state.nextFetchs.push(state.posts.length - 1)
    }
  },
  selectHobby(state: RootState, hobby: Hobby): void {
    state.selected = hobby
    state.posts = [] as OnePost[]
    state.next_link = ''
    state.nextFetchs = [] as number[]
  },
  insertNextFetch(state: RootState, index: number): void {
    state.nextFetchs.push(index)
  },
  removeNextFetch(state: RootState, index: number): void {
    state.nextFetchs = state.nextFetchs.filter((value, ind) => value != index)
  },
  setScrollPosition(state: RootState, index: number | string): void {
    state.scrollPostition = index
  },
  resetNextLink(state: RootState): void {
    state.next_link = ''
    state.nextFetchs = [] as number[]
  },
  reset(state: RootState): void {
    state.posts = []
    state.selected = undefined
    state.nextFetchs = []
    state.next_link = ''
  },

  updatePostAction(
    state: RootState,
    payload: { action: string; pid: string }
  ): void {
    state.posts.forEach((post, index) => {
      if (post.post_id === payload.pid) {
        if (payload.action === 'love' || payload.action === 'un_love') {
          post.footer.action_map.love += post.meta.actions.loved === 1 ? -1 : 1
          post.meta.actions.loved = post.meta.actions.loved === 1 ? 0 : 1
        } else if (payload.action === 'view') {
          post.footer.action_map.view += post.meta.actions.viewed === 0 ? 1 : 0
          post.meta.actions.viewed = 1
        } else if (payload.action === 'share') {
          post.footer.action_map.share += 1
          post.meta.actions.shared = 1
        } else if (payload.action === 'comment') {
          post.footer.action_map.comment += 1
        }
        Object.assign(state.posts[index], post)
      }
    })
  },

  updateAssociation(state: RootState, aid: string): void {
    state.posts.forEach((post, index) => {
      if(post.meta.account_id === aid) {
        post.header.following = 1
        Object.assign(state.posts[index], post)
      }
    })
  }
}

export const actions: ActionTree<RootState, RootState> = {
  fetchDiscover(
    { state, commit },
    payload: { hobby?: Hobby; next?: number }
  ): void {
    let url = 'discover?'
    if (state.next_link.length > 0 && payload.hobby === undefined) {
      url = url + `${state.next_link.replace('?', '')}&`
    }
    if (state.hobbies.length > 0) {
      url += 'no_hobby&'
    }
    if (payload.hobby != undefined) {
      commit('selectHobby', payload.hobby)
    }
    if (state.selected != undefined) {
      url += `hobby=${state.selected.code_name}&`
    }

    if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
      const storage = new FrozenStorage()
      let token = storage.get('token') as string | null
      if (token != null) {
        this.$axios.setToken(token)
      }
    }
    this.$axios.get(url).then(res => {
      if (res.status === 200) {
        if (payload.next != undefined) {
          commit('addNextPosts', res.data)
          commit('removeNextFetch', payload.next)
        } else {
          commit('setData', res.data)
          // console.log(res.data, state.selected, payload);
        }
      }
    })
  }
}
