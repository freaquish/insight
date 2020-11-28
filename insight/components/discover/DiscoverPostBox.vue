<template>
  <div @click="onClick" :id="post.post_id" class="w-full h-auto my-2" style="max-height: 16rem">
    <!-- Image -->
    <div v-if="getAssetType === 'images'" class="w-full h-full">
      <img
        :src="post.body.images[0]"
        class="w-full h-auto rounded-lg"
        style="min-height: 12rem; max-height: 14rem"
      />
    </div>

    <!-- Video -->
    <div v-else-if="getAssetType === 'video'" class="w-full relative" style="height:6.1rem;">
        <video
          :src="`${post.body.video}#t=1`"
          class="w-full h-24 rounded-lg absolute z-0"
        />
        <div class="w-full h-full absolute z-10 flex flex-col justify-center">
            <span class="m-auto material-icons play-color text-5xl">play_arrow</span>
        </div>
    </div>

    <!-- Audio -->
    <div v-else-if="getAssetType === 'audio'" class="w-full h-56 relative">
        <div class="w-full h-full absolute z-0">
            <AudioWave class="stroke-current bg-orange-200" />
        </div>
        <div class="w-full h-full absolute z-10 flex flex-col justify-center">
            <span class="m-auto material-icons play-color text-5xl">play_arrow</span>
        </div>
    </div>

    <!-- Text -->
    <div
      v-else-if="getAssetType === 'text'"
      class="border flex flex-col border-gray-500 p-0 w-full h-auto rounded-lg overflow-hidden"
      style="max-height: 14rem"
    >
      <img
        v-if="
          this.post.body.images != undefined && this.post.body.images.length > 0
        "
        :src="post.body.images[0]"
        class="w-full h-32"
      />
      <p class="break-words font-lato text-sm p-2">{{ post.body.text.data }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {mapState, mapActions} from "vuex"
import { OnePost } from '@/types/index'
import AudioWave from "@/components/util/AudioWave.vue"
import IsInViewport from '@/static/js/in-viewport'

export default Vue.extend({
  mounted() {
      let self = this
    this.$nextTick().then(() => {
        this.bindViewMonitor()
    })
  },
  props: {
    post: {} as PropOptions<OnePost>,
    index: 0 as PropOptions<number>
  },
  components:{
      AudioWave
  },
  data(){
      return {
          viewMonitor: null as IsInViewport | null
      }
  },
  computed: {
    getAssetType(): string {
      if (this.post.body.text != undefined) {
        return 'text'
      } else if (
        this.post.body.images != undefined &&
        this.post.body.images.length > 0
      ) {
        return 'images'
      } else if (this.post.body.video != undefined) {
        return 'video'
      }
      return 'audio'
    },

    ...mapState("discover", ['nextFetchs'])
   
  },

  methods: {
      ...mapActions("discover", ['fetchDiscover']),
       bindViewMonitor():void {
        this.viewMonitor = new IsInViewport(this.$el)
        this.viewMonitor.$init(this.$el, (entry: IntersectionObserverEntry) => {
            if(entry.intersectionRatio >= 0.25 && this.nextFetchs.includes(this.index)){
                // Testing stuff console.log(entry.intersectionRatio, this.nextFetchs, this.nextFetchs.includes(this.index));
                this.fetchDiscover({next:this.index})
            }
        })
    },
    onClick(): void {
      this.$emit('select', this.index)
    }
  }
})
</script>

<style scoped>
.play-color {
  color: rgba(255, 255, 255, 0.85);;
}
</style>