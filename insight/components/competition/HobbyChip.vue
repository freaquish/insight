<template>
    <div @click="onClick" :class="`mx-2 my-2 text-center px-4 py-2 font-muli font-semibold ${selected ? 'hot-pink text-white' :'slate-gray text-black'} rounded-md`">
        <p>
            {{hobby.name}}
            <span v-if="this.selected" class="mx-2 material-icons text-white text-base stroke-current">clear</span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import {Hobby} from "@/types";

export default Vue.extend({
    props: {
        hobby: {} as PropOptions<Hobby>,
        selected: false as PropOptions<boolean>
    },
    methods: {
        onClick():void {
            if(this.selected){
                this.$emit('de-select', this.hobby);
            }else{
                this.$emit('select', this.hobby);
            }
        }
    }
})
</script>

<style scoped>
.hot-pink {
    background-color: #FA6262;
}
.slate-gray{
    background: rgba(196, 196, 196, 0.53);
}
</style>