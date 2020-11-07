<template>
  <div class="w-full h-full pt-2 pb- px-2 overflow-hidden ">
    <p
      class="wrap-text text-lg flex flex-col"
      style="width:100%; overflow-y:scroll;touch-action: pan-y !important; max-height:50vh;"
      v-html="text"
    ></p>
  </div>
</template>

<script>
export default {
  props: ['data', 'media'],
  data() {
    return {
      text: undefined
    }
  },
  mounted() {
    let self = this
    this.getText()
    this.$nextTick().then(() => {
      let elem = self.$el.querySelector('p')
      if (self.data.bgColor != undefined) {
        self.$el.style.setProperty('background-color', self.data.bgColor)
      }
      if (self.data.fontColor != undefined) {
        self.$el.style.setProperty('color', self.data.fontColor)
      }
      if (self.data.fontName != undefined) {
        self.$el.style.setProperty('font-family', self.data.fontName)
      }
    })
  },
  methods: {
    getImage: function() {
      if (this.media != undefined && this.media.type === 'image') {
        return `<div class="w-full mb-2">
                  <img class="w-full h-full rounded-lg" src="${this.media.src}" />
               </div>`
      }
    },
    getVideo: function() {
      if (this.media != undefined && this.media.type === 'video') {
        return `<div class="w-full mb-2">
                  <video controls class="w-full h-full rounded-lg" src="${this.media.src}" />
               </div>`
      }
    },
    getText: function() {
      this.text = this.data.data
      // console.log(this.media);
      if (this.media != undefined) {
        this.text = `${
          this.media.type === 'image' ? this.getImage() : this.getVideo()
        }${this.text}`
      }
    }
  }
}
</script>

<style scoped>
.wrap-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
