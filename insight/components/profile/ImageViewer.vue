<template>
  <div v-if="this.active" class="w-full h-screen flex flex-col bg-black">
    <div class="w-full flex justify-between h-12 py-2 px-4">
      <span
        @click="$emit('revert', false)"
        class="material-icons stroke-current text-white"
        >keyboard_backspace</span
      >
      <button
        @click="doneClicked"
        v-if="this.edit && this.image != this.src"
        class="px-4 rounded-md font-muli font-bold bg-white shadow-md"
      >
        Done
      </button>
    </div>
    <div class="w-full py-24" style="height:60vh;">
      <img :src="image" class="w-full" style="max-height:45vh;" />
    </div>
    <div class="w-full flex justify-center">
      <MediaPicker
        v-if="this.edit"
        @pick="imagePicked"
        :filetype="'image'"
        :multiple="false"
      >
        <image-svg class="w-full h-full" />
      </MediaPicker>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MediaPicker from '@/components/editor_elements/MediaPicker.vue'
import ImageSvg from '@/assets/svg/ImageSvg.vue'
export default {
  props: ['active', 'src', 'edit'],
  components: {
    MediaPicker,
    ImageSvg
  },
  data() {
    return {
      image: this.src
    }
  },
  methods: {
    ...mapActions('profile/profile', ['uploadImageToFirebase']),
    doneClicked: function() {
      this.$emit('revert', false)
      this.stateLoading(true)
      let self = this
      this.uploadImageToFirebase({
        src: self.image,
        func: () => {
          self.stateLoading(false)
        }
      })
    },
    stateLoading: function(val, text) {
      this.$emit('stateloading', val, text)
    },
    pickImage() {
      let elem = this.$el.querySelector('input')
      elem.click()
    },
    imagePicked(file, type) {
      this.image = URL.createObjectURL(file.files[0])
    }
  }
}
</script>