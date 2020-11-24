<template>
  <div class="w-full h-full min-h-screen flex flex-col">
    <div class="w-full flex px-2 py-4 fixed z-10 bg-white shadow-lg">
      <span @click="navBack" class="material-icons">keyboard_backspace</span>
      <div class="w-full flex flex-row-reverse pr-6">
          <p @click="onNextClick" class="font-muli font-semibold text-lg text-blue-600">Next</p>
      </div>
    </div>

    <div class="mt-12 flex flex-col pb-32 pt-6">
      <div v-for="hobby in hobby_list" :key="hobby.code_name">
        <div
          class="w-full flex flex-col justify-center py-6 px-6 border-b-2 border-gray-300"
        >
          <div class="w-full flex">
            <input
              type="checkbox"
              class="my-auto mr-4"
              :name="hobby.name"
              :value="hobby.code_name"
              v-model="selectedHobby"
            />
            <p class="font-muli text-lg">{{ hobby.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default Vue.extend({
  mounted() {
    this.fetchHobbies()
  },
  data(){
      return {
          selectedHobby: [] as string[]
      }
  },
  computed: {
    ...mapState('post/create_post', ['hobby_list']),
  },
  methods: {
    ...mapActions('post/create_post', ['fetchHobbies']),
    ...mapMutations('post/create_post', ['reset']),
    navBack(): void {
      this.reset()
      this.$router.go(-1)
    },
    onNextClick():void {}
  },
})
</script>