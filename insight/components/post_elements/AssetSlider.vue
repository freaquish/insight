<template>
  <client-only>
    <div
      class="w-full body flex flex-col slider"
      style="touch-action: pan-y !important;"
    >
      <div
        class="w-full px-0 py-1  bg-transparent"
        style="max-height:100%;"
      >
        <!-- <loader-view :loading="loading" > -->
        <div class="stylseet" styles="width:100%;height:50vh;" v-if="this.isActive('text')">
          <text-box style="border-radius:16px;" :data="getSrc()" :media="getTextMedia()" />
        </div>
        <div
          class="w-full h-full"
          v-if="!this.isTextAvailable() && this.isActive('image')"
        >
          <img
            :src="getSrc()"
            v-show="!this.infinite"
            class="rounded-none w-full"
            style="max-height:50vh;touch-action: pan-y !important;"
            @load="loadingComplete"
            @error="changestate({ loading: false, error: true })"
          />
          <infinity-loading :active="infinite" />
        </div>
        <div
          class="w-full h-full"
          v-if="!this.isTextAvailable() && this.isActive('video')"
        >
          <video
            v-if="playVideo"
            controls
            :src="getSrc()"
            @play="managePlayState"
            class="stylseet w-full"
            style="max-height:50vh;height:100%;touch-action: pan-y !important;"
            @load="loading = false"
            @error="changestate({ loading: false, error: true })"
          />
        </div>
        <div
          class="w-full"
          style="height:54vh;"
          v-if="!this.isTextAvailable() && this.isActive('audio')"
        >
          <audio-box
            :audio="getSrc()"
            :active="playAudio"
            style="stylseet touch-action: pan-y !important;"
            @state="changestate"
          />
        </div>
        <!-- </loader-view> -->
      </div>
      <div class="w-full h-auto flex justify-center" style="max-height:2%;">
        <div
          v-if="!this.isTextAvailable() && this.assets.length > 1"
          class="inline-flex w-auto h-full"
        >
          <div
            class="w-auto h-auto"
            v-for="asset in assets"
            :key="assets.indexOf(asset)"
          >
            <peripheral-dot :active="assets.indexOf(asset) === index" />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import LoaderView from '@/components/post_elements/LoaderView.vue'
import AudioBox from '@/components/post_elements/AudioBox.vue'
import PeripheralDot from '@/components/post_elements/PeripheralDot.vue'
import TextBox from '@/components/post_elements/TextBox.vue'
import InfinityLoading from '@/components/InfinityLoading.vue'
export default {
  props: ['propAsset', 'propInfinte'],
  mounted() {
    if(this.propInfinite != undefined){
      this.infinite = propInfinite
    }
    // console.log('asset_slider',this.propAsset);
    this.data = { ...this.propAsset }
    this.assets = []

    if (this.data.text != undefined) {
      this.assets.push({ type: 'text', src: this.data.text })
    }

    if (this.data.images != undefined) {
      this.data.images.forEach(image => {
        this.assets.push({ type: 'image', src: image })
      })
    }

    if (this.data.video != undefined) {
      this.assets.push({ type: 'video', src: this.data.video })
    }

    if (this.data.audio != undefined) {
      this.assets.push({ type: 'audio', src: this.data.audio })
    }

    this.$nextTick().then(() => {
      if (process.client) {
        this.hammer = new Hammer.Manager(this.$el)

        let swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL })

        this.hammer.add(swipe)

        this.hammer.on('swipeleft', this.slideNext)

        this.hammer.on('swiperight', this.slidePrevious)
      }
    })
  },
  components: {
    LoaderView,
    AudioBox,
    PeripheralDot,
    TextBox,
    InfinityLoading
  },
  data() {
    return {
      loading: false,
      intersecting: true,
      infinite: false,
      error: false,
      data: {
        images: [],
        video: undefined,
        audio: undefined
      },
      assets: [],
      index: 0,
      hammer: undefined,
      playAudio: true,
      playVideo: true,
      img: undefined
    }
  },
  updated() {},
  methods: {
    changeloading: function(value) {
      this.loading = value
    },
    slideNext: function() {
      if (!this.isTextAvailable() && this.index < this.assets.length - 1) {
        if (this.isActive('image')) {
          this.infinite = true
        }
        this.index += 1
      }
    },
    slidePrevious: function() {
      if (!this.isTextAvailable() && this.index > 0) {
        this.index -= 1
      }
    },
    fetchAsset: function(url, payload) {
      return new Promise((resolve, reject) => {
        if (payload.type != 'text') {
          el.src = payload.src
          el.onload = resolve
          el.onerror = reject
        }
      })
    },

    loadingComplete: function(event) {
      this.infinite = false
    },

    isActive: function(type) {
      return (
        this.assets[this.index] != undefined &&
        this.assets[this.index].type === type
      )
    },
    getSrc: function() {
      if (this.assets[this.index] != undefined) {
        this.loading = true
        //console.log(this.assets[this.index]);
        return this.assets[this.index].src
      }
    },
    getTextMedia: function() {
      if (this.data.images != undefined && this.data.images.length > 0) {
        return { type: 'image', src: this.data.images[0] }
      } else if (
        this.data.images != undefined &&
        this.data.video != undefined
      ) {
        return { type: 'video', src: this.data.video }
      } else {
        return undefined
      }
    },
    isTextAvailable: function() {
      if (
        this.data.text === undefined ||
        JSON.stringify(this.data.text) === JSON.stringify({})
      ) {
        return false
      } else {
        return true
      }
    },
    changestate: function(payload) {
      this.loading = payload.loading
      this.error = payload.error
    },
    managePlayState: function() {
      let thisVideo = this.$el.querySelector('video')
      let videos = document.querySelectorAll('video')
      videos.forEach((video, i) => {
        if (video != thisVideo) {
          video.pause()
        }
      })
    }
  }
}
</script>

<style scoped>
.body {
  min-width: 100%;
  /* min-height: ; */
}

.slider {
  max-height: 55vh;
}

/*.stylseet {
  box-shadow:0px 14px 17px rgba(129, 129, 129, 0.35);
  border-radius:1rem;
}*/
</style>
