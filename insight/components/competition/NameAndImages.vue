<template>
  <div class="w-full h-full flex flex-col px-4">
    <div class="w-full flex pt-2">
      <span @click="$router.go(-1)" class="material-icons"
        >keyboard_backspace</span
      >
    </div>
    <div class="relative w-full mt-4 h-64 bg-gray-200 rounded-md">
      <div v-if="this.imageExist" class="w-full h-full absolute z-0">
        <img class="w-full h-full" :src="this.getImage" />
      </div>
      <div @click="onImagePickerClick" class="absolute z-10 insert-svg">
        <span  class="material-icons text-6xl text-gray-800"
          >insert_photo</span
        >
        <input  @input="onPickImage" type="file" accept="image/*" class="hidden image-picker" />
      </div>
    </div>

    <div class="w-full mt-4 rounded-md px-2 py-2 bg-gray-200">
      <label class="font-muli text-base font-semibold"
        >COMPETITION USERNAME<span class="text-red-600">*</span></label
      >
      <div class="w-full flex">
        <input
          v-model="tag"
          @input="onInputCompetitionTag"
          class="w-full font-muli px-2 pt-2 hover:outline-none bg-gray-200 outline-none border border-r-0 border-l-0 border-t-0 border-gray-800"
        />
        <span
          v-if="this.tagIsUnique === false"
          class="material-icons text-red-600"
          >clear</span
        >
        <span
          v-else-if="this.tagIsUnique === true && this.tag.length > 6"
          class="material-icons text-green-600"
          >done</span
        >
      </div>
    </div>

    <div class="w-full mt-8 rounded-md px-2 py-2 bg-gray-200">
      <label class="font-muli text-base font-semibold"
        >COMPETITION NAME<span class="text-red-600">*</span></label
      >
      <input
        v-model="name"
        class="w-full px-2 pt-2 hover:outline-none bg-gray-200 outline-none border border-r-0 border-l-0 border-t-0 border-gray-800"
      />
    </div>

    <!-- Toggle Switch -->
    <div class="flex mt-10">
      <p class="font-muli font-semibold">Will you participate?</p>
      <ToggleSwitch class="mx-4" :active="participated" @click="onToggle" />
    </div>

    <!-- Button -->
    <div class="w-full mt-6">
      <button
      @click="onNextClick"
        class="bg-cremson-red font-lato text-xl text-white font-semibold w-full py-3 rounded-md"
      >
        NEXT
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'

import ToggleSwitch from '@/streak/ToggleSwitch.vue'
export default Vue.extend({
  components: {
    ToggleSwitch,
  },
  data() {
    return {
      name: null as string | null,
      tag: null as string | null,
      participated: false as boolean,
      image: null as string | null
    }
  },
  computed: {
    ...mapState('competition', ['tagIsUnique', 'competition']),
    imageExist(): boolean {
      return (
        this.competition != undefined &&
        this.competition.images != undefined &&
        this.competition.images.length > 0
      ) || this.image != null
    },
    getImage(): string {
      if(this.image != null) return this.image;
      return this.competition.images[0]
    },
  },
  methods: {
    ...mapActions('competition', ['checkTag']),
    ...mapMutations("competition", ['createCompetition']),
    onPickImage(): void {
      let imageInput = this.$el.querySelector('.image-picker') as HTMLInputElement;
      if(imageInput.files != null){
        if(this.image != null && this.image.length > 0){
          URL.revokeObjectURL(this.image);
        }
        this.image = URL.createObjectURL(imageInput.files[0]);
      }
    },
    onImagePickerClick():void{
      let imageInput = this.$el.querySelector('.image-picker') as HTMLInputElement;
      imageInput.click();
    },
    onToggle(participated: boolean): void {
      this.participated = participated
    },
    verifyCompetitionTag(tag: string): void {
      this.checkTag(tag)
    },
    onInputCompetitionTag(): void {
      this.verifyCompetitionTag(this.tag as string);
    },
    createCompetitionInStore(): void {
      // console.log({tag: this.tag, name: this.name, image: this.image, judgedByUser: !this.participated});
      
      this.createCompetition({tag: this.tag, name: this.name, image: this.image, judgedByUser: !this.participated});
    },
    onNextClick():void {
      // Create Competiton is store and move to next page
      if(this.image != null && this.image.length > 0 && this.tag != null && this.tagIsUnique && this.tag.length > 6 && 
      this.name != null && this.name.length > 0){
        this.createCompetitionInStore();
        this.$emit('next', 2);
      }
    }
  },
})
</script>

<style scoped>
.insert-svg {
  top: 40%;
  left: 40%;
}

.bg-cremson-red {
  background-color: #fa6262;
}
</style>