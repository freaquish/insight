<template>
    <div @click="onClick" class="px-2 py-1" :id="hobby.code_name">
        <p :class="`bg-transparent ${active? 'font-bold font-lato text-3xl pt-0' :'font-muli text-lg pt-2'} ${isScoreContainerOverflown? 'text-pink-600' : 'text-white'} `" style="white-space:nowrap;">{{hobby.name}}</p>
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