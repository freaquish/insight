<template>
  <div class="w-full h-full flex pt-4 flex-col pb-24">
    <div class="w-full px-4 flex justify-between">
      <span @click="onBackClick" class="material-icons"
        >keyboard_backspace</span
      >
      <button @click="onNextClick" class="px-4 py-2 rounded-md bg-red-500 text-white font-semibold font-muli">Create</button>
    </div>
    <div class="mt-4 mb-4 w-full px-4">
      <p class="font-lato font-bold text-2xl">Description</p>
    </div>

    <div v-for="field in fields" :key="field">
      <div class="w-full px-6 mt-2">
        <div
          class="w-full border px-2 py-4 flex flex-col border-gray-300 rounded-md shadow-md"
        >
          <div class="w-full flex justify-between">
            <input
              placeholder="Heading"
              v-model="keys[field - 1]"
              class="w-full font-lato font-bold text-xl placeholder-gray-600 focus:outline-none px-2 border border-t-0 border-r-0 border-l-0 border-gray-400"
            />
            <span
              @click="onRemoveFieldClick(field)"
              class="material-icons px-4 rounded-full py-4 text-red-600"
              >maximize</span
            >
          </div>
          <textarea
            :rows="getRows(field)"
            class="mt-6 text-gray-600 font-muli outline-none focus:outline-none border border-t-0 border-r-0 border-l-0 border-gray-400"
            v-model="values[field - 1]"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="w-full flex px-6 mt-4">
      <button
        @click="onAddFieldClick"
        class="w-full bg-blue-100 outline-none focus:outline-none py-3 text-gray-700 rounded-md"
      >
        <div class="flex justify-center">
          <span class="material-icons">add</span>
          <p>Field</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapMutations} from "vuex"

interface Object {
    [k:string]: any
}

export default Vue.extend({
  computed: {},
  data() {
    return {
      fields: 1 as number,
      keys: [''] as string[],
      values: [''] as string[],
    }
  },
  methods: {
    ...mapMutations("competition", ['setCompetitionDetails']),
    emitIndex(index: number): void {
      this.$emit('index', index)
    },
    onNextClick(): void {
        let details = {} as Object;
        for(let index=0; index < this.keys.length; index++){
            details[this.keys[index]] = this.values[index]
        }
        this.setCompetitionDetails(details);
        this.emitIndex(5);
    },
    onBackClick(): void {
      this.emitIndex(3)
    },
    getRows(index: number): number {
      let n = 1
      if (this.values.length >= index) {
        n = this.values[index - 1].split('\n').length
      }
      return n
    },
    onAddFieldClick(): void {
    //   console.log(this.keys.length, this.values.length, this.fields)
      if (
        this.keys[this.keys.length - 1].length > 0 &&
        this.values[this.values.length - 1].length > 0
      ) {
        this.fields += 1
        this.keys.push('')
        this.values.push('')
      }

    //   console.log(this.keys, this.values, this.fields)
    },
    onRemoveFieldClick(index: number): void {
      if (this.keys.length > index && this.values.length > index) {
        this.keys.splice(index, 1)
        this.values.splice(index, 1)
        this.fields -= 1
      }
    },
    
  },
})
</script>

<style>
</style>