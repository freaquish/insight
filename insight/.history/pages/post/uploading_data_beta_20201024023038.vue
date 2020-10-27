<template>
  <div class="w-full h-full flex-col">
    <div class="w-full h-10 flex px-2">
      <span class="material-icons" @click="$router.go(-1)"
        >keyboard_backspace</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import { ProgressAsset } from '@/plugins/FirebasePlugin'

export default Vue.extend({
  computed: {
    ...mapState('post/create_post', ['porgression'])
  },
  methods: {}
})
</script>

<style scoped></style>
