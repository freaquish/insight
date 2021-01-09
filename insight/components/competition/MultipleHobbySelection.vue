<template>
  <div
    class="w-screen h-full overflow-x-hidden overflow-y-scroll flex flex-col"
  >
    <div class="w-full py-4 flex justify-between px-4">
      <span @click="onClickBack" class="material-icons"
        >keyboard_backspace</span
      >
      <button
        @click="onClickNext"
        class="px-6 py-2 font-muli rounded-md hover:bg-blue-800 text-white font-semibold bg-blue-600"
      >
        Next
      </button>
    </div>

    <!-- Selected Hobbies -->
    <div
      v-if="this.isShowingSelectedHobbyContainer"
      class="w-full flex flex-wrap px-4 py-6 border border-l-0 border-r-0 border-gray-400"
    >
      <div v-for="hobby in getSelectedHobbies" :key="hobby.code_name">
        <HobbyChip
          @de-select="onDeSelectHobby"
          :hobby="hobby"
          :selected="true"
        />
      </div>
    </div>

    <!-- All Hobbies -->
    <div class="w-full h-auto py-6 px-2 flex flex-wrap">
      <div v-for="hobby in allHobbies" :key="hobby.code_name">
        <HobbyChip @select="onSelectHobby" :hobby="hobby" :selected="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Hobby } from '~/types'

// Components
import HobbyChip from '@/components/competition/HobbyChip.vue'
import { mutations } from '~/store/competition'

export default Vue.extend({
  components: {
    HobbyChip,
  },
  mounted() {
    let self = this
    if (this.allHobbies.length === 0) {
      this.fetchHobbies(() => {
        self.allHobbies = self.hobbies
      })
    }
  },
  data() {
    return {
      allHobbies: [] as Hobby[],
    }
  },
  computed: {
    ...mapGetters('post/create_post', ['hobbies']),
    ...mapGetters('competition', ['getSelectedHobbies','isCreatingCompetition']),
    isShowingSelectedHobbyContainer(): boolean {
      return this.getSelectedHobbies.length > 0
    },
  },
  methods: {
    ...mapMutations('competition', ['selectHobby', 'removeHobby', 'flushHobbies' , 'setCompetitionHobbies']),
    ...mapMutations("post/create_post", ['flushPostHobbies']),
    ...mapActions('post/create_post', ['fetchHobbies']),
    onClickNext(): void {
        this.setCompetitionHobbies(this.getSelectedHobbies)
        this.$emit('next');
    },
    onClickBack(): void {
        // this.flushHobbies();
        this.$emit('exit');
    },
    onSelectHobby(hobby: Hobby): void {
      this.selectHobby(hobby)
      this.allHobbies = this.allHobbies.filter(
        (value) => value.code_name != hobby.code_name
      )
    },
    onDeSelectHobby(hobby: Hobby): void {
      this.removeHobby(hobby)
      this.allHobbies.push(hobby)
    },
  },
})
</script>

<style scoped>
</style>