<template>
  <div
    class="w-full h-full min-h-screen overflow-hidden flex flex-col justify-center"
  >
    <div class="w-full h-auto flex flex-col">
      <img src="@/assets/svg/hiding_cat.svg" class="w-56 mx-auto" />
      <p class="font-lato font-bold text-3xl text-center">
        Excuse me Imposter!
      </p>
      <p class="font-muli font-semibold text-lg text-center">
        Only creativity allowed here
      </p>
      <div class="w-fullh-auto flex mt-4 justify-center">
        <button
        @click="routerToLogin"
          class="px-6 py-2 font-muli font-semibold text-xl bg-green-400 rounded-md text-white"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FrozenStorage from '~/static/js/local_storage'
export default Vue.extend({
    methods: {
        routerToLogin(): void {
            const storage = new FrozenStorage()
            storage.logOut()
            this.$router.replace('/auth/login')
        }
    }
})
</script>