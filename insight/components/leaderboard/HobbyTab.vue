<template>
    <div @click="onClick" class="px-2 py-1" :id="hobby.code_name">
        <p :class="`font-lato font-bold px-3 py-2 rounded-md  ${active? 'bg-pink-600 text-white' :'text-gray-800 bg-cream-gray'}  `" style="white-space:nowrap;">{{hobby.name}}</p>
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import {Hobby} from "@/types/index"
export default Vue.extend({
    props: {
        hobby: {} as PropOptions<Hobby>,
        active: false as PropOptions<boolean>,
        isScoreContainerOverflown: false as PropOptions<boolean>
    },
    computed: {},
    methods: {
        onClick(): void {
            this.$emit('click', this.hobby)
        }
    }
})
</script>

<style>
.bg-cream-gray{
    background-color: #F2F2F2;
}
</style>