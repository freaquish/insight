<template>
    <div class="w-auto h-full mx-1 rounded-lg px-2 py-2 flex flex-row" :style="{background: activecolor}" :class="backcolor">
        <div class="px-2 py-auto" style="width:20%">
            <img class="w-12 h-12 rounded-full" :src="getAvatar" />
        </div>
        <div class="px-4 py-auto font-semibold text-sm font-muli" style="width:65%">
            <p>
                {{body_text}}
            </p>
        </div>
        <div class="px-2 mr-0 ml-auto py-auto py-auto" style="width:15%">
            <p>
                {{timing}}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Notification } from '@/types/index'
import { avatarDefault } from '~/static/js/assets'
export default Vue.extend({
    data() {
        return {
            activecolor : 'white',
        }
    },
  props: {
    notif: {} as PropOptions<Notification>
  },
//   computed: {
//     getAvatar(): string {
//       return this.notif.account.avatar != undefined &&
//         this.notif.account.avatar.length > 0
//         ? this.notif.account.avatar
//         : avatarDefault
//     },
//     body_text() : string {
//         return this.notif.body
//     },
//     timing() : string {
//         return this.notif.time
//     }
    
//     },
    methods : {
        backcolor() : void {
            this.activecolor = 'red';
        }
    }
})
</script>