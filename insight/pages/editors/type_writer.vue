<template>
  <div class="w-full h-screen bg-white flex flex-col">
    <!-- Header -->
    <div class="w-full pb-2 px-2 pt-2 flex flex-col justify-between">
      <div class="w-full h-auto py-2 flex justify-between">
        <span @click="navBack" class="material-icons">keyboard_backspace</span>
        <p class="font-lato font-semibold text-lg">Type Writer</p>
        <button class="px-2 py-1">
          <span @click="next()" class="material-icons text-purple-600"
            >east</span
          >
        </button>
      </div>

      <div class="flex justify-center">
        <div
          class="inline-block bg-green-400 px-2 py-1 font-muli text-white font-bold rounded-md"
        >
          Write something inspiring
        </div>
      </div>
    </div>

    <!-- Editor -->
    <div class="w-full h-full flex flex-col-reverse">
      <!-- ToolBox -->
      <div class="w-full h-12 bg-gray-800 flex justify-around pt-2">
        <i
          @click="pickerClicked('image-picker')"
          class="fa fa-picture-o stroke-current text-white fa-lg px-2 py-2"
          aria-hidden="true"
        ></i>
        <input
          v-show="false"
          type="file"
          accept="image/*"
          id="image-picker"
          class="display-none"
          @change="dataPicked('image-picker')"
        />
        <i
          @click="pickerClicked('video-picker')"
          class="fa fa-video-camera stroke-current text-white fa-lg px-2 py-2"
          aria-hidden="true"
        ></i>
        <input
          v-show="false"
          type="file"
          accept="video/*"
          id="video-picker"
          class="display-none"
          @change="dataPicked('video-picker')"
        />

        <i
          @click="pickerClicked('font')"
          class="fa fa-text-width stroke-current text-white fa-lg px-2 py-2"
          aria-hidden="true"
        ></i>
        <i
          @click="pickerClicked('textcolor')"
          class="fa fa-font stroke-current text-white fa-lg px-2 py-2"
          aria-hidden="true"
        ></i>
        <i
          @click="pickerClicked('bgcolor')"
          class="fa fa-paint-brush stroke-current text-white fa-lg px-2 py-2"
          aria-hidden="true"
        ></i>
      </div>

      <!-- Preview -->
      <div v-if="this.showing != undefined" class="w-full h-16 bg-gray-800">
        <div
          v-if="this.showing === 'font'"
          class="flex flex-row overflow-x-scroll"
        >
          <div v-for="font in fonts" :key="font">
            <FontBox :font="font" @font-selected="updateFont" />
          </div>
        </div>

        <div
          v-if="this.showing === 'bgcolor' || this.showing === 'textcolor'"
          class="flex flex-row overflow-x-scroll pt-1"
        >
          <div v-for="color in colors" :key="color">
            <ColorBox :color="color" @color-selected="updateColor" />
          </div>
        </div>
      </div>

      <!-- MediaSuite -->
      <div
        class="h-auto w-full flex justify-center mb-8"
        v-if="this.image != undefined || this.video != undefined"
      >
        <div class="flex">
          <div v-if="this.image != undefined">
            <img :src="image" class="w-48 h-32" />
          </div>
          <div v-if="this.video != undefined">
            <video class="w-48 h-32" :src="`${video}#t=1`" controls />
          </div>
          <div class="h-32 px-2 flex flex-col justify-center">
            <span @click="removeMedia()" class="material-icons text-red-600"
              >delete_outline</span
            >
          </div>
        </div>
      </div>

      <div class="w-full h-full bg-white">
        <textarea
          id="editor"
          contenteditable="true"
          v-model="data"
          placeholder="Write something inspiring!"
          class="w-full border-2 focus:outline-none border-gray-200 border-l-0 border-r-0 border-b-0 min-height-editor overflow-x-hidden overflow-y-scroll px-1 py-2"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { colors, fonts } from '@/static/js/assets'
import { TextAsset, Assets } from '@/types/index'
import FontBox from '@/components/editor_elements/FontBox.vue'
import ColorBox from '@/components/editor_elements/ColorBox.vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  components: {
    FontBox,
    ColorBox
  },
  data() {
    return {
      editor: undefined as HTMLTextAreaElement | undefined,
      image: undefined as string | undefined,
      video: undefined as string | undefined,
      data: undefined as string | undefined,
      currentBgColor: colors[0],
      currentFont: fonts[0],
      currentTextColor: colors[1],
      fonts: fonts,
      colors: colors,
      showing: undefined as string | undefined
    }
  },
  mounted() {
    this.editor = this.$el.querySelector('#editor') as HTMLTextAreaElement
    this.updateFont(this.currentFont)
    this.updateBgColor(this.currentBgColor)
    this.updateTextColor(this.currentTextColor)
    this.editor.focus()
  },
  methods: {
    ...mapMutations('post/create_post', [
      'insertTextData',
      'insertAssets',
      'resetAssets'
    ]),
    updateBgColor(colorHex: string): void {
      if (this.editor != undefined && colorHex.length > 0) {
        this.currentBgColor = colorHex
        this.editor.style.setProperty('background-color', this.currentBgColor)
      }
    },
    updateColor(color: string): void {
      if (this.showing == 'bgcolor') {
        this.updateBgColor(color)
      } else {
        this.updateTextColor(color)
      }
    },
    updateFont(fontName: string): void {
      if (this.editor != undefined && fontName.length > 0) {
        this.currentFont = fontName
        this.editor.style.setProperty('font-family', this.currentFont)
      }
    },
    updateTextColor(colorHex: string): void {
      if (this.editor != undefined && colorHex.length > 0) {
        this.currentTextColor = colorHex
        this.editor.style.setProperty('color', this.currentTextColor)
      }
    },
    removeMedia(): void {
      if (this.image != undefined) {
        URL.revokeObjectURL(this.image)
      }
      this.image = undefined
      if (this.video != undefined) {
        URL.revokeObjectURL(this.video)
      }
      this.video = undefined
    },

    dataPicked(uid: string): void {
      console.log('working');
      
      let data = this.$el.querySelector(`#${uid}`) as HTMLInputElement
      console.log(data.files)
      if (data.files != null && data.files.length > 0) {
        let url = URL.createObjectURL(data.files[0])
        switch (uid) {
          case 'image-picker':
            this.removeMedia()
            this.image = url
            // Reseting files so to pick the same file again
            data.files = null
            break
          case 'video-picker':
            this.removeMedia()
            this.video = url
            data.files = null
            break
        }
      }
    },

    navBack(): void {
      this.resetAssets()
      this.$router.go(-1)
    },

    pickerClicked(clicked: string): void {
      let elem
      switch (clicked) {
        case 'image-picker':
          elem = this.$el.querySelector('#image-picker') as HTMLInputElement
          if (elem != null) elem.click()
          break
        case 'video-picker':
          elem = this.$el.querySelector('#video-picker') as HTMLInputElement
          if (elem != null) elem.click()
          break
        default:
          if (this.showing === clicked) {
            this.showing = undefined
          } else {
            this.showing = clicked
          }
          break
      }
    },

    next(): void {
      if (this.data != undefined && this.data.length > 0) {
        this.insertTextData({
          data: this.data,
          fontName: this.currentFont,
          fontColor: this.currentTextColor,
          bgColor: this.currentBgColor
        })

        if (this.image != undefined) {
          this.insertAssets({ images: [this.image] })
        } else if (this.video != undefined) {
          this.insertAssets({ video: this.video })
        }

        this.$router.push('/post/caption_page')
      }
    }
  }
})
</script>

<style scoped>
.min-height-editor {
  /* min-height: 50ch; */
  min-height: 52vh;
}
</style>
