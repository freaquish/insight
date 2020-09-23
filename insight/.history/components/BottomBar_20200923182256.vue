<template>
  <client-only>
    <div class="fixed bg-white py-4 flex flex-row justify-around w-full h-12">
      <div>
        <span @click="navigate('/', true)" class="material-icons">home</span>
      </div>
      <div>
        <span @click="navigate('/search', false)" class="material-icons"
          >search</span
        >
      </div>

      <div>
        <span
          @click="navigate('/post/hobby_window', false)"
          class="material-icons"
          >add</span
        >
      </div>

      <div>
        <span
          @click="navigate('/post/hobby_window', false)"
          class="material-icons"
          >notifications_none</span
        >
      </div>

      <div>
        <span
          @click="navigate('/post/hobby_window', false)"
          class="material-icons"
          >settings</span
        >
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    navigate(to: string, replace: boolean | undefined): void {
      if (replace === undefined || replace == false) {
        this.$router.push(to)
      } else {
        this.$router.replace(to)
      }
    }
  }
})
</script>
