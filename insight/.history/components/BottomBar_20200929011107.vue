<template>
  <client-only>
    <section
      class="block py-2 fixed inset-x-0 bottom-0 z-10 bg-black w-full h-16"
    >
      <div
        class="h-full bg-blue-500 text-pink-600 flex flex-row justify-around "
      >
        <div>
          <span @click="navigate('/', true)" class="material-icons text-3xl"
            >home</span
          >
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
            @click="navigate('/notifications', false)"
            class="material-icons"
            >notifications_none</span
          >
        </div>

        <div>
          <span @click="navigate('/settings', false)" class="material-icons"
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
