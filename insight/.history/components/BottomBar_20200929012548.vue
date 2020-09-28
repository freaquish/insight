<template>
  <client-only>
    <section class="block px-2 py-2 fixed inset-x-0 bottom-0 z-10 w-full h-16">
      <div
        class="h-full rounded-md shadow-md bg-pink-600 pt-2 text-white flex flex-row justify-around "
      >
        <div class="border-4 border-t-0 border-l-0 border-r-0 border-white">
          <span @click="navigate('/', true)" class="material-icons text-3xl"
            >home</span
          >
        </div>
        <div>
          <span
            @click="navigate('/search', false)"
            class="material-icons text-3xl"
            >search</span
          >
        </div>

        <div>
          <span
            @click="navigate('/post/hobby_window', false)"
            class="material-icons text-3xl"
            >add</span
          >
        </div>

        <div>
          <span
            @click="navigate('/notifications', false)"
            class="material-icons text-3xl"
            >notifications_none</span
          >
        </div>

        <div>
          <span
            @click="navigate('/settings', false)"
            class="material-icons text-3xl"
            >settings</span
          >
        </div>
      </div>
    </section>
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

<style scoped>
.bg-navy-blue {
  background-color: rgb(86, 70, 166);
}

.bg-navy-blue-shallow {
  background-color: rgb(105, 79, 182);
}
</style>
