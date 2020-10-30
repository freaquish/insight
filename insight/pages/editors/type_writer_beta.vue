<template>
  <div class="w-full h-screen bg-white flex flex-col">
    <!-- Header -->
    <div class="w-full pb-2 px-2 pt-2 flex flex-col justify-between">
      <div class="w-full h-auto py-2 flex justify-between">
        <span class="material-icons">keyboard_backspace</span>
        <p class="font-lato font-semibold text-lg">Type Writer</p>
        <button
          class="px-4 py-2 rounded-md font-montserrat text-white text-sm bg-purple-600 "
        >
          Next
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
      <div class="w-full h-12 bg-gray-800"></div>

      <!-- Preview -->
      <div v-if="this.showing != undefined" class="w-full h-16 bg-gray-800">

        <div v-if="this.showing === 'font'" class="flex flex-row overflow-x-scroll">
          <div v-for="font in fonts" :key="font">
            <FontBox :font="font" />
          </div>
        </div>

        <div v-if="this.showing === 'bgcolor' || this.showing === 'textcolor'" class="flex flex-row overflow-x-scroll pt-1">
            <input type="color"  class=""/>
            <div v-for="color in colors" :key="color">
            <ColorBox :color="color" />
          </div>
        </div>

      </div>

      <!-- MediaSuite -->
      <div class="h-auto w-full" v-if="this.image != undefined  || this.video != undefined"></div>

      <div class="w-full h-full bg-white">
        <div
          id="editor"
          contenteditable="true"
          class="border-2 focus:outline-none border-gray-200 border-l-0 border-r-0 border-b-0 min-height-editor overflow-x-hidden overflow-y-scroll px-1 py-1"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { colors, fonts } from '@/static/js/assets'
import { TextAsset } from '@/types/index'
import FontBox from '@/components/editor_elements/FontBox.vue'
import ColorBox from '@/components/editor_elements/ColorBox.vue'

export default Vue.extend({
  components: {
    FontBox,
    ColorBox
  },
  data() {
    return {
      editor: undefined as HTMLDivElement | undefined,
      image: undefined as string | undefined,
      video: undefined as string | undefined,
      data: undefined as string | undefined,
      currentBgColor: colors[0],
      currentFont: fonts[1],
      currentTextColor: colors[1],
      fonts: fonts,
      colors: colors,
      showing: undefined as string | undefined
    }
  },
  methods: {
    updateBgColor(colorHex: string): void {
      if (this.editor != undefined && colorHex.length > 0) {
        this.currentBgColor = colorHex
        this.editor.style.setProperty('background-color', this.currentBgColor)
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
    onPaste(e: Event): void {
      e.preventDefault()
    },
    onCopy(e: Event): void {
      e.preventDefault()
    }
  }
})
</script>

<style scoped>
.min-height-editor {
  /* min-height: 50ch; */
  min-height: 72vh;
}
</style>
