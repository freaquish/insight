<template>
  <div
    id="caption-page"
    class="w-full h-screen bg-tint-purple overflow-auto flex flex-col"
  >
    <!-- Header -->
    <div class="w-full h-26 flex justify-between px-4 py-4">
      <span
        @click="$router.go(-1)"
        class="material-icons stroke-current text-white"
      >
        keyboard_backspace
      </span>
      <button class="font-muli font-bold text-white px-2 py-1">Next</button>
    </div>
    <!-- Body -->
    <div class="w-full h-auto flex flex-col pt-2 px-4">
      <p class="font-lato text-white">Add Caption</p>
      <div
        contenteditable="true"
        id="caption-editor"
        class="w-full px-2 py-2 focus:outline-none text-white font-montserrat border-2 border-l-0 border-r-0 border-t-0 border-white"
      ></div>
      <p class="mt-6 font-lato text-white font-lato">
        Tags<span
          class="ml-2 font-montserrat text-sm px-2 py-1 rounded-md bg-tint-purple-shallow"
          >enter tags for indexing post</span
        >
      </p>
      <div
        contenteditable="true"
        id="tags-editor"
        class="w-full px-2 py-2 focus:outline-none text-white font-montserrat border-2 border-l-0 border-r-0 border-t-0 border-white"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FrozenStorage from '@/static/js/local_storage.js'
export default {
  components: {},
  data() {
    return {
      caption: undefined,
      editor: undefined,
      watchIndex: undefined,
      data: undefined,
      hash: false,
      storage: undefined,
      firstName: undefined
    }
  },
  computed: {
    ...mapState('post/create', ['assets'])
  },
  updated() {
    // this.editor = document.getElementById('editor')
  },
  mounted() {
    // this.editor = document.getElementById('editor')
    // this.applyAsset()
    this.$nextTick().then(() => {
      this.storage = new FrozenStorage()
      this.firstName = this.storage.get('first_name')
      // this.editor.focus()
    })
  },
  methods: {
    ...mapMutations('post/create', ['insertCaption']),
    nextClick: function() {
      this.insertCaption(this.editor.innerText)
      this.$router.push('/post/uploading_data')
    },
    applyAsset: function() {
      let div = document.getElementById('cap-body')
      if (this.assets.images != undefined && this.assets.images.length > 0) {
        div.innerHTML = `<img class="w-full h-full" src="${this.assets.images[0]}" />`
      } else if (this.assets.video != undefined) {
        div.innerHTML = `<video src="${this.assets.video}" controls class="w-full h-full" />`
      } else if (this.assets.audio != undefined) {
        div.innerHTML = `<audio src="${this.assets.audio}" controls class="w-full h-full" />`
      }
    },
    keyPress: function() {}
  }
}
</script>

<style scoped>
.caret-purple {
  caret-color: blueviolet;
}
.var-height {
  min-height: 5rem;
  max-height: 8rem;
}
.var-height > div {
  height: 3.5rem;
  max-height: 7rem;
  caret-color: blueviolet;
}
</style>
