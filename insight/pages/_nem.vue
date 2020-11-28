<template>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    asyncData({redirect}){
        redirect('/error/404')
    }
})
</script>