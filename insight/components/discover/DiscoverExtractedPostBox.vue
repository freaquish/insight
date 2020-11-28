<template>
  <div
    class="w-full font-lato text-white h-full flex flex-col pt-6 overflow-hidden shadow-md bg-black"
    style="touch-action: pan-y !important; min-height: 100vh"
  >  

    <!-- loader -->


    <!-- Header -->
    <div class="w-full h-auto flex px-4">
      <image-box :src="post.header.avatar" class="w-12 h-12 rounded-full" />
      <div class="w-full h-full flex flex-col ml-4">
        <p class="font-muli font-semibold truncate">
          {{ post.header.username }}
        </p>
        <p class="text-sm font-muli truncate">{{ post.header.hobby_name }}</p>
      </div>
      <div v-if="this.post.header.following === 0" class="w-full h-auto flex flex-row-reverse pr-4">
        <button @click="onFollowClick" class="bg-white rounded-sm px-4 focus:outline-none  h-8 text-black">Follow</button>
      </div>
    </div>


    <!-- Infinity Loader -->
    <div v-if="this.loader" class="w-full h-auto mt-6" style="height: 20rem;">
      <infinity-loading :active="loader" />
    </div>
    <!-- Body -->
    <div v-if="!this.loader" class="w-full h-auto mt-6">
      <AssetSlider :propAsset="post.body" />
    </div>

    <!-- Commands -->
    <ActionBar v-if="!this.showFullCaption" :post="post" />

    <!-- Caption -->

    <div v-if="this.showingCaptionDiv && !this.showFullCaption" class="w-full h-auto font-muli text-white flex flex-row-reverse mt-4 px-2">
      <p @click="toggleCaptionSize()" class="px-2 xs:text-xs text-sm font-semibold">More+</p>
      <p class="truncate px-2 w-full" v-html="caption" ></p>
    </div>

    <!-- Full Screen Caption -->
    <div v-if="this.showFullCaption" class="w-full font-muli glass absolute z-10 px-2 mt-20" style="height:30rem;">
      <div class="w-full h-full glass-white px-4 py-2 overflow-hidden rounded-sm flex flex-col-reverse">
        <div class="w-full h-auto py-2 px-2 flex flex-row-reverse">
          <p @click="toggleCaptionSize()" class="px-4 py-1">Show Less</p>
        </div>
        <p class="break-words w-full font-semibold h-full overflow-y-scroll overflow-x-hidden py-2" v-html="caption"></p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue, { PropOptions } from 'vue'
import { OnePost } from '~/types'
import {mapActions, mapMutations} from "vuex"
import ActionBar from '../discover/ActionBar.vue'
import AssetSlider from '../post_elements/AssetSlider.vue'
import ImageBox from '../util/ImageBox.vue'
import InfinityLoading from '@/components/InfinityLoading.vue'

export default Vue.extend({
  components: { AssetSlider, ImageBox, ActionBar, InfinityLoading  },
  props:['post','index'],

  mounted(){
    this.$nextTick().then(() => {
      // this.getCaption()
      this.loader = false
      if(process.client){
        let hammer = new Hammer.Manager(this.$el)
        let swipe = new Hammer.Swipe({direction: Hammer.DIRECTION_VERTICAL})
        hammer.add(swipe)
        hammer.on('swipeup', this.slideNext)
        hammer.on('swipedown', this.slidePrevious)
      }
    })
  },
  updated(){
    // this.getCaption()
    this.loader = false
  },
  data(){
    return {
      showFullCaption: false,
      loader: false,
    }
  },
  computed: {
    showingCaptionDiv(){
      return this.post.caption != undefined && this.post.caption.length > 0
    },

    caption(){
      return this.getCaption()
    }
    
  },
  methods: {
    ...mapActions('profile/follows', ['followactions']),
    ...mapMutations('discover', ['updateAssociation']),
    toggleCaptionSize(){
      if(this.showingCaptionDiv){
        this.showFullCaption = !this.showFullCaption
      }
    },
    slideNext(){
      this.loader = true
      this.$emit('next', this.index)
    },
    slidePrevious(){
      this.loader = true
      this.$emit('prev', this.index)
    },
    onFollowClick(){
      let self = this
      this.followactions({aid: self.post.meta.account_id, onComplete: function(){
        self.updateAssociation(self.post.meta.account_id)
      }})
    },
    getCaption: function() {
      let regex = /@[0-9a-z_?]+|#[0-9a-z_?]+/gi
      let caption = this.post.caption
      let matches = caption.match(regex) || []
      if (matches.length > 0) {
        for (let index = 0; index < matches.length; index++) {
          if (matches[index].includes('#')) {
            caption = caption.replace(
              matches[index],
              `<span class="font-montserrat italic text-blue-500">${matches[index]}</span>`
            )
          } else if (matches[index].includes('@')) {
            caption = caption.replace(
              matches[index],
              `<span class="font-montserrat text-blue-700">${matches[index]}</span>`
            )
          }
        }
      }
      // console.log(caption);
      return caption
    }
  }
})
</script>


<style scoped>
.glass{
  background-color: rgba(0 , 0, 0, 0.65);
}

.glass-white{
  background-color: rgba(255, 255, 255, 0.65);
}
</style>