import FrozenStoreage from "@/static/js/local_storage"
// import {IncompleteDataException, BadRequestException, AccountExistException} from "@/static/js/exeptions";
import { ActionTree, MutationTree } from 'vuex'
import { CreateCommunity } from '@/types/index'


export const state = (): CreateCommunity  => ({
    communityName: undefined,
    communityTag: undefined,
    isTagAvailabel: false,
    description: undefined,
    selectedHobbies: [],
});

export type RootState = ReturnType<typeof state>


type Mutations = {
    setCommunityData(state: RootState, data: CreateCommunity): void
}

export const mutations: MutationTree<RootState> & Mutations = {
    setCommunityData(state, data): void{
        state.communityName = data.communityName;
        state.communityTag = data.communityTag;
        state.description = data.description;
        state.selectedHobbies = data.selectedHobbies;
    },
    communityTagAvailabel(state, available){
        state.isTagAvailabel = available;
    },
}

export const actions: ActionTree<RootState, RootState> = {

    async checkcommunityTagAvailabel({commit,state}, communityTag){
        const url = `auth/community_check?community_tag=${communityTag}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['exist'] === 1){
            commit('isTagAvailabel', true);
        }else{
            commit('isTagAvailabel', false);
        }
    },

    uploadDataToServer({commit,state}){
        let url = `community/create?`

        if (state.communityName != undefined, state.communityTag != undefined,
            state.description != undefined, state.selectedHobbies != []){
                let packet = {
                    "communityname": state.communityName, "communitytag": state.communityTag,
                    "description": state.description, "communityhobby": state.selectedHobbies
        };

        if (this.$axios.defaults.headers.common["Authorization"] == undefined){
            const storage = new FrozenStoreage();
            this.$axios.setToken('Authorization', storage.get('token'));

        } 
        this.$router.push('/')
        }
    }
}