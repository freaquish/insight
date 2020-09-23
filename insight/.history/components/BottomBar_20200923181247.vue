<template>
  <client-only>
    <div class="fixed bg-white flex flex-row justify-around w-full h-10 py-2">
      <div>
        <span @click="navigate('/', true)" class="material-icons">home</span>
      </div>
      <div>
        <span @click="navigate('/', true)" class="material-icons">search</span>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    navigate(to: string, replace: boolean | undefined): void {
      if (replace === undefined) {
        this.$router.push(to)
      } else {
        this.$router.replace(to)
      }
    }
  }
})
</script>
