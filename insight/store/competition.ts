import { MutationTree, ActionTree, Store, GetterTree } from 'vuex'
import Competition, { ViewJson } from '@/static/api/Competition'
import FrozenStorage from '~/static/js/local_storage'
import { Hobby } from '~/types'
import { Listener, StorageData, StorageVaultBeta } from '~/plugins/FirebasePlugin'

export const state = () => ({
  competitions: [] as Competition[],
  competition: undefined as Competition | undefined,
  searched: null as string | null,
  tagIsUnique: undefined as undefined | boolean,
  links: {} as { next: string; previous: string },
  hobbies: [] as Hobby[]
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getSelectedHobbies(state: RootState): Hobby[] {
    return state.hobbies
  },
  isCreatingCompetition(state: RootState): boolean {
    return state.tagIsUnique === true && state.competition != undefined
  }
}

export const mutations: MutationTree<RootState> = {
  setCompetitions(state: RootState, competitions: Competition[]): void {
    state.competitions = competitions
  },
  setCompetitionsFromData(state: RootState, competitionsJson: object[]): void {
    state.competitions = competitionsJson.map((competition: object) =>
      Competition.fromJson(competition)
    ) as Competition[]
  },
  setSearchText(state: RootState, text: string): void {
    state.searched = text
  },
  setCompetition(state: RootState, competition: Competition): void {
    state.competition = competition
  },
  createCompetition(
    state: RootState,
    data: { tag: string; image: string; name: string; judgedByUser: boolean }
  ): void {
    state.competition = new Competition(data.tag, data.name, [data.image], 1)
  },
  setCompetitionImages(state: RootState, images: string[]):void {
    if(state.competition != undefined){
      state.competition.images = images
    }
  },
  setCompetitionHobbies(state: RootState, hobbies: Hobby[]): void {
    if (state.competition != undefined && state.tagIsUnique === true) {
      state.competition.setHobbies(hobbies)
    } else {
      state.hobbies = hobbies
    }
  },
  selectHobby(state: RootState, hobby: Hobby): void {
    state.hobbies.push(hobby)
  },
  setCompetitionDetails(state: RootState,details: object ): void {
    if(state.competition != undefined){
      state.competition.setDetails(details);
    }
  },
  flushHobbies(state: RootState): void {
    state.hobbies = [] as Hobby[]
  },
  removeHobby(state: RootState, hobby: Hobby): void {
    if (
      state.competition != undefined &&
      state.tagIsUnique === true &&
      state.competition.hobbies != undefined
    ) {
      state.competition.setHobbies(
        state.competition.hobbies.filter(
          value => value.code_name != hobby.code_name
        )
      )
    } else {
      state.hobbies = state.hobbies.filter(
        value => value.code_name != hobby.code_name
      )
    }
  },
  setCompetitionDates(
    state: RootState,
    dates: { start: Date; end: Date; result: Date }
  ): void {
    if (state.competition != undefined) {
      state.competition.setStartDate(dates.start)
      state.competition.setEndDate(dates.end)
      state.competition.setResultDate(dates.result)
    }
  },

  setTagIsUnique(state: RootState, unique: boolean): void {
    state.tagIsUnique = unique
  }
}

interface SearchData {
  hobbies?: string[]
  is_live?: number
  other_user?: string
  is_submittable?: boolean
  is_coming?: boolean
  is_passed?: boolean
  participated?: boolean
  tag?: string
  name?: string
  start?: Date
  end?: Date
}

interface StoreInheritingFunction {
  (store?: Store<RootState>): any
}

export const actions: ActionTree<RootState, RootState> = {
  searchCompetition({ commit }, data: SearchData): void {
    let url = 'competition/search?'
    for (const [key, value] of Object.entries(data)) {
      if (
        key === 'is_live' ||
        key === 'is_submittable' ||
        key === 'is_coming' ||
        key === 'participated'
      ) {
        url += `${key}=${value ? 1 : 0}&`
      } else if (key === 'start' || key === 'end') {
        url += `${key}=${Competition.formatDate(value)}`
      } else {
        url += `${key}=${value}&`
      }
    }
    this.$axios.get(url).then(res => {
      if (res.status === 200) {
        commit('setCompetitionsFromData', res.data.data)
      }
    })
  },

  searchCompetitionByText({ dispatch, commit }, text: string): void {
    commit('setSearchText', text)
    dispatch('searchCompetition', { name: text, tag: text } as SearchData)
  },
  checkTag({ commit }, tag: string): void {
    if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
      const storage = new FrozenStorage()
      this.$axios.setHeader('Authorization', storage.get('token'))
    }
    this.$axios.get(`competition/checks?tag=${tag}`).then(res => {
      if (res.status === 200) {
        commit('setTagIsUnique', !(res.data.exists === 1))
      }
    })
  },
  uploadImage({state, dispatch, commit}, next?: StoreInheritingFunction): void {
    const storage = new StorageVaultBeta();
    if(state.competition != null && state.competition != undefined){
      storage.init({
        "images": state.competition?.images
      }, {
        complete: (data: StorageData) =>{
          if(state.competition != undefined && data.images != undefined){
            console.log(data, state);
            
            commit('setCompetitionImages',data.images);
            dispatch("createCompetitionOnServer", next);
          }
        },
        progress: (data) => {},
        error: () => {}

      } );
      storage.bulkUpload();
    }
  },
  createCompetitionOnServer({state, commit}, next?: StoreInheritingFunction): void {
    if (state.competition != undefined) {
      // Setting hobbies
      commit('setCompetitionHobbies', state.hobbies);
      let json = state.competition.toJson()
      if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
        const storage = new FrozenStorage()
        this.$axios.setHeader('Authorization', storage.get('token'))
      }
      this.$axios.post('competition/create', JSON.stringify(json)).then(res => {
        console.log(res);
        
        switch (res.status) {
          case 201:
            if (next != undefined) next(this);
            break;
          case 406:
            this.$router.replace('/competition/error')
            break;
        }
      })
    }
  },
  createCompetition({ state, dispatch}, next?: StoreInheritingFunction): void {
    if(state.competition != undefined){
      dispatch('uploadImage', next);
    }
  },
  fetchCompetitionView(
    { state, commit },
    data: { tag: string; tab?: string }
  ): void {
    let url = `competition/views/${data.tag}`
    if (data.tab != undefined) {
      url += `?tab=${data.tab}`
    } else if (state.links != undefined && state.links.next != undefined) {
      url += state.links.next
    }
    if (this.$axios.defaults.headers.common['Authorization'] === undefined) {
      const storage = new FrozenStorage()
      this.$axios.setHeader('Authorization', storage.get('token'))
    }
    this.$axios.get(url).then(res => {
      if (res.status === 200) {
        state.links = res.data.links
        commit(
          'setCompetition',
          Competition.fromViewJSON(res.data.data as ViewJson)
        )
      }
    })
  }
}
