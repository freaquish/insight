<template>
  <div class="">
    <div style="margin-bottom:vh;">
      <div
        v-if="!$device.isMobile"
        class="w-full h-full flex flex-col justify-center"
      >
        <div class="w-full h-auto px-4 py-4 flex justify-center">
          <img
            class="w-64"
            src="https://firebasestorage.googleapis.com/v0/b/social-express-103904.appspot.com/o/assets%2Fundraw_access_denied_6w73.svg?alt=media&token=09a64622-38a6-4626-aefd-aa276f69683d"
          />
        </div>
        <div class="w-full h-auto px-4 py-4 flex justify-center">
          <p class="font-lato text-bold text-lg text-red-600">
            Currently we support only mobile devices.
          </p>
        </div>
      </div>
      <div v-else>
        <nuxt />
      </div>
    </div>

    <div v-if="!this.isAuthRoute()" class="">
      <BottomBar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomBar from '@/components/BottomBar.vue'
export default Vue.extend({
  components: {
    BottomBar
  },
  methods: {
    isAuthRoute(): boolean {
      //this function tell whether current route is any auth(login/register) route in order to hide bottom bar
      return (
        this.$route.name != undefined &&
        this.$route.name != null &&
        this.$route.name.includes('auth')
      )
    }
  }
})
</script>

1<style>
.grided {
  display: grid;
  grid-template-rows: 95vh 5vh;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
