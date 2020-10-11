import FrozenStoreage from "@/static/js/local_storage"
import {IncompleteDataException, BadRequestException, AccountExistException} from "@/static/js/exeptions";
import { ActionTree, MutationTree } from 'vuex'
import { CreateCommunity } from '@/types/index'


export const state = (): CreateCommunity  => ({
    communityName: undefined,
    communityTag: undefined,
    communityTagAvailabel: undefined,
    discription: undefined,
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
        state.discription = data.discription;
        state.selectedHobbies = data.selectedHobbies;
    },
    communityTagAvailabel(state, available){
        state.communityTagAvailabel = available;
    },
}

export const actions: ActionTree<RootState, RootState> = {

    async checkcommunityTagAvailabel({commit,state}, communityTag){
        const url = `auth/community_check?community_tag=${communityTag}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['available'] === 1){
            commit('communityTagAvailabel', true);
        }else{
            commit('communityTagAvailabel', false);
        }
    },

    uploadDataToServer({commit,state}){
        let url = `community/create?`

        if (state.communityName != undefined, state.communityTag != undefined,
            state.discription != undefined, state.selectedHobbies != []){
                let packet = {
                    "community_name": state.communityName, "community_tag": state.communityTag,
                    "discription": state.discription, "community_hobby": state.selectedHobbies
        };

        delete this.$axios.defaults.headers.common["Authorization"];
        
        this.$axios.post(url, JSON.stringify(packet)).then(res => {
            console.log(res);
                if(res.status == 201){
                    const storage = new FrozenStoreage();
                    storage.set('token', `Token ${res.data.token}`);
                    this.$axios.setHeader('Authorization',`Token ${res.data.token}`);
                    storage.set('community_name',`${res.data.community_name}`);
                    storage.set('community_tag',`${res.data.community_tag}`);
                    storage.set('discription',`${res.data.discription}`);
                    storage.set('banner', res.data.banner);
                    this.$router.push('/')
                }
            }).catch((err) =>{
                commit('raiseError', 'Bad Request');
            })    
        }
    }
}