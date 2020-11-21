<template>
    <div @click="onCardClick" :data-self="user.isSelf === 1? true: false" :class="`${containerOverflown ? bgColor :'bg-white-85'} w-full pt-3 pb-4 border-b-2 border-gray-300 px-4 h-auto flex`">
        <p class="font-muli text-gray-700 mt-2 text-lg">{{user.rank}}</p>
        <ImageBox :src="user.account.avatar" class="w-12 ml-4 h-12 rounded-full" />
        <div class="w-full h-full flex flex-col ml-6">
            <p class="font-muli font-semibold text-gray-900">{{user.account.name}}</p>
            <p class="text-sm text-blue-700">@{{user.account.username}}</p>
        </div>
        <!-- <p>{{user.score}}</p> -->
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import {RankCard} from  '@/types/index'
import ImageBox from "@/components/util/ImageBox.vue"
export default Vue.extend({
    components: {
        ImageBox
    },
    computed:{
        bgColor(): string{
            return this.user.isSelf === 1? 'pink-grad' : 'bg-white'
        }
    },
    props : {
        user: {} as PropOptions<RankCard>,
        containerOverflown: false as PropOptions<boolean>
    },
    methods:{
        onCardClick():void {
            this.$router.push(`/profile/${this.user.account.username}`)
        }
    }
})
</script>

<style scoped>
.pink-grad {
    background: linear-gradient(89.9deg, rgba(252, 8, 67, 0.31) 10.28%, rgba(255, 255, 255, 0) 99.9%), rgba(253, 253, 253, 0.82);
    background-color: white;
}
</style>