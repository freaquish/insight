<template>
    <transition name="fade">
        <div v-if="this.show" class="modal px-8 pt-8 pb-20 overflow-hidden" @click="close()">
            <div style="height:70vh;" class="relative w-full rounded-md shadow-lg py-2 bg-white flex flex-col">
                <div class="w-full h-10 flex font-lato font-bold justify-center">Select Country</div>
                <div class="w-full mt-2 h-full overflow-y-scroll flex flex-col">
                    <div v-for="code in codes" :key="code[0]">
                        <div class="w-full h-10 flex pl-4" @click="select(code)">
                            <p>{{code[0]}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import {countryCodes} from "@/static/js/assets"
export default Vue.extend({
    props: ['show'],
    data(){
        return {
            codes: countryCodes
        }
    },
    methods: {
        close():void {
            this.$emit('close')
        },
        select(code:string[]): void {
            this.$emit('select', code)
        }
    }
})
</script>


<style scoped>
.modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>