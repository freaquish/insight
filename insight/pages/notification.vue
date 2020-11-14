<template>
    <div class="bg w-full h-full min-h-screen">
        <!-- Header -->
        <div class="w-full flex pt-4 px-4">
            <span
                @click="$router.go(-1)"
                class="material-icons stroke-current text-white"
                >keyboard_backspace
            </span>
            <div class="w-full flex justify-center">
                <p class="font-lato font-bold text-white text-2xl">Notification</p>
            </div>
        </div>
    
    <NotificationCard />

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NotificationCard from '@/components/NotificationCard.vue'
export default Vue.extend({


components: {
   NotificationCard, 
},


})
</script>