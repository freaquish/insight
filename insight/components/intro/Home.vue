<template>
  <div class="w-full h-screen relative font-bold font-lato text-3xl text-white">
    <div class="w-full h-screen absolute z-0">
      <img
        v-if="index === 0"
        src="@/assets/img/singing.jpg"
        class="w-full h-full"
      />
      <img
        v-else-if="index === 1"
        src="@/assets/img/real.jpg"
        class="w-full h-full"
      />
      <img
        v-else-if="index === 2"
        src="@/assets/img/dancing.jpg"
        class="w-full h-full"
      />
      <img
        v-else-if="index === 3"
        src="@/assets/img/people.jpg"
        class="w-full h-full"
      />
      <img
        v-else-if="index === 4"
        src="@/assets/img/dis.jpg"
        class="w-full h-full"
      />
    </div>
    <div class="w-full absolute px-2 py-4" style="bottom: 10%">
      <div class="w-full nim py-4 px-2">
        <p>{{ getText }}</p>
        <button
          @click="$router.push('/auth/register')"
          v-if="this.index === 4"
          class="w-full py-4 mt-2 text-center text-lg text-white font-bold bg-purple-600 rounded-md"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script lang>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      index: 0,
      pastTimer: false
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (process.client) {
        let hammer = new Hammer.Manager(this.$el)
        let swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_VERTICAL })
        hammer.add(swipe)
        hammer.on('swipeup', this.swipeUp)
        hammer.on('swipedown', this.swipeDown)
        this.rotate()
      }
    })
  },
  computed: {
    getText() {
      if (this.index === 0) {
        return 'Unleash the talent hidden inside you, impress people and gain popularity'
      } else if (this.index === 1) {
        return "Stop being slave of others,\nfollowing others like sheep"
      } else if (this.index === 2) {
        return 'Embrace yourself, live your life.\nIn the world of fake people, be the real you'
      } else if (this.index === 3) {
        return 'Find and connect with people with same interests,\npeople who will understand you'
      } else if (this.index === 4) {
        return 'Discover creativity from depth of the streets to width of the world'
      }
      return ''
    },
  },
  methods: {
    onGetStartedClick() {
      this.$router.push('/auth/register')
    },
    rotate() {
      setInterval(() => {
        if (this.index === 4 || this.pastTimer) {
          clearInterval();
          this.pastTimer = true;
        } else if (this.index < 4 && !this.pastTimer) {
          this.index += 1
          // console.log(this.index)
        }
      }, 3500)
    },
    swipeUp() {
      this.pastTimer = true;
      if (this.index < 4) {
        this.index += 1
      }
    },
    swipeDown() {
      if (this.index > 0) {
        this.index -= 1
      }
    },
  },
})
</script>

<style scoped>
.nim {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* border-radius: 10px; */
}
@media (min-width: 768px) {
  .md\:text-8xl {
    font-size: 6.8rem;
  }
  .img {
    max-width: 70%;
    height: 70vh;
  }
}

.img {
  max-width: 60%;
  height: 70vh;
}
.transient-bg {
  background: linear-gradient(
    90deg,
    #080808 2.88%,
    rgba(30, 30, 30, 0.57) 100%
  );
}

@media (min-width: 1024px) {
  .lg\:h-8 {
    height: 2rem;
  }
  .lg\:text-8xl {
    font-size: 7rem;
  }
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 20%;
  -ms-transform: translateY(-20%);
  transform: translateY(-20%);
}
</style>