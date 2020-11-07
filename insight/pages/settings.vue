<template>
  <div class="w-full h-full flex flex-col py-2">
    <div class="w-full h-12 py-2 px-2 flex">
      <span @click="$router.go(-1)" class="material-icons">clear</span>
      <div class="w-full h-full flex justify-center">
        <p class="font-lato font-bold text-lg">Settings</p>
      </div>
    </div>

    <div class="mt-4 px-6 w-full h-full">
      <div class="w-full rounded-lg bg-blue-grey-50 ">
        <!-- Profile -->
        <div
          @click="navigate('/profile/self')"
          class="w-full h-12 pl-2 border-bold pt-3 font-muli font-semibold flex"
        >
          <span class="material-icons mr-2">account_circle</span> Profile
        </div>

        <!-- Change Password -->
        <div
          @click="navigate('/change_password')"
          class="w-full h-12 pl-2 border-bold pt-3 font-muli font-semibold flex"
        >
          <span class="material-icons mr-2">vpn_key</span> Change Password
        </div>

        <!-- LogOut -->
        <div
          @click="logOut()"
          class="w-full h-12 pl-2 pt-3 font-muli border-bold font-semibold flex"
        >
          <span class="material-icons mr-2"> exit_to_app </span>Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FrozenStorage from '@/static/js/local_storage'
export default Vue.extend({
  methods: {
    logOut(): void {
      let storage = new FrozenStorage()
      storage.logOut()
      this.navigate('/')
    },
    navigate(route: string): void {
      this.$router.push(route)
    }
  }
})
</script>

<style scoped>
.bg-blue-grey-50 {
  background: #eceef1;
}

.border-bold {
  border-style: solid;
  border-color: white;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}
</style>