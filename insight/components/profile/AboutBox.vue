<template>
  <div class="w-full mt-4 h-full flex flex-col">
    <!-- Editable -->
    <div v-if="this.editable" class="w-full h-10 flex flex-row-reverse">
      <div v-if="this.changing" class="w-full h-full flex">
        <button
          @click="onClickCancel"
          class="w-full h-full text-center font-muli text-whit text-red-600"
        >
          Cancel
        </button>
        <button
          @click="onClickSave"
          class="w-full h-full text-center font-muli text-white bg-green-400"
        >
          Save
        </button>
      </div>

      <div
        @click="toggleChangeState"
        v-else
        class="px-4 py-2 bg-gray-200 rounded-md"
      >
        <span class="material-icons">
          create
        </span>
      </div>
    </div>

    <!-- Name -->
    <div class="px-4 mt-2 flex flex-col w-full">
      <label class="font-montserrat  text-purple-600 font-semibold">Name</label>
      <div
        id="name-input"
        v-html="name"
        @input="nameInput"
        :contenteditable="changing"
        :class="
          `py-2 focus:outline-none ${
            changing
              ? 'border border-l-0 border-r-0 border-t-0 border-purple-600'
              : ''
          }`
        "
      ></div>
    </div>

    <!-- Description -->
    <div class="px-4 mt-4 flex flex-col w-full">
      <label class="font-montserrat text-purple-600 font-semibold"
        >Description</label
      >
      <div
        @input="textInput"
        id="text-box"
        v-html="description"
        :contenteditable="changing"
        :class="
          `py-2 focus:outline-none ${
            changing ? 'border rounded-md px-2 border-purple-600' : ''
          }`
        "
      ></div>
    </div>

    <!-- Hobbies -->
    <div class="w-full h-auto px-2 py-2 mt-4 flex flex-wrap">
      <div v-for="hobby in hobbies" :key="hobby">
        <p
          :class="`px-2 mx-1 my-2 rounded-md py-1 font-muli ${hobbyBoxColor()}`"
        >
          {{ hobby }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  props: ['editable', 'propName', 'propDescription', 'hobbies'],
  mounted() {
    this.name = this.propName
    this.description = this.propDescription
  },
  updated() {
    this.name = this.propName
    this.description = this.propDescription
  },
  data() {
    return {
      changing: false as boolean,
      name: '' as string,
      description: '' as string,
      newDescription: '' as string,
      colorClasses: [
        'bg-blue-100 text-blue-500',
        'bg-green-100 text-green-500',
        'bg-red-100 text-red-500',
        'bg-orange-100 text-orange-500',
        'bg-purple-100 text-purple-500'
      ]
    }
  },
  computed: {
    ...mapGetters('profile/profile', ['fullName', 'renderedDescription']),
    getName():string{
      let name = this.$el.querySelector('#name-input') as HTMLDivElement;
      return name.innerText;
    }
  },
  methods: {
    toggleChangeState(): void {
      this.changing = !this.changing
    },
    validateChanges(): boolean {
      return (
        this.getName != this.propName ||
        this.description != this.renderedDescription
      )
    },
    nameInput():void{
      let el = this.$el.querySelector('#name-input') as HTMLDivElement;
              
    },
    textInput(): void {
      let textBox = this.$el.querySelector('#text-box') as HTMLDivElement
      this.newDescription = textBox.innerText
    },
    onClickCancel(): void {
      this.name = this.propName
      let name = this.$el.querySelector('#name-input') as HTMLDivElement;
      name.innerText = this.propName;
      this.description = this.propDescription
      this.changing = false
    },
    onClickSave(): void {   
      if (this.validateChanges() || true) {
        if(this.getName.length == 0){
          this.getName = this.propName;
        }
        let nameSplit = this.getName.split(' ') as string[]
        this.changing = false
        if(this.newDescription.length == 0){
          this.newDescription = this.propDescription;
        }
        this.$emit('change', {
          first_name: nameSplit[0],
          last_name: nameSplit[1],
          description: this.newDescription
        })
      } else {
        this.onClickCancel()
      }
    },
    hobbyBoxColor(): string {
      return this.colorClasses[
        parseInt(
          this.getRandomArbitrary(0, this.colorClasses.length - 1).toFixed(0)
        )
      ]
    },
    getRandomArbitrary(min: number, max: number): number {
      return Math.random() * (max - min) + min
    }
  }
})
</script>