<template>
  <div class="w-full h-full flex flex-col min-h-screen">
    <div v-if="this.index === 1">
      <NameAndImages @next="updatePageIndex" />
    </div>
    <div v-else-if="this.index === 2">
      <MultipleHobbySelection @next="onNextInHobbySelection" @exit="onBackInHobbySelection" />
    </div>
    <div v-else-if="this.index === 3">
      <Dates @index="updatePageIndex" />
    </div>
    <div v-else-if="this.index === 4">
      <Description @index="updatePageIndex" />
    </div>
    <div v-else-if="this.index ===5">
      <CreationLoader />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import NameAndImages from '@/components/competition/NameAndImages.vue'
import MultipleHobbySelection from "@/components/competition/MultipleHobbySelection.vue"
import Dates from "@/components/competition/Dates.vue"
import Description from "@/components/competition/Description.vue"
import CreationLoader from "@/components/competition/CreationLoader.vue"

export default Vue.extend({
  components: {
    NameAndImages,
    MultipleHobbySelection,
    Dates,
    Description,
    CreationLoader
  },
  data() {
    return {
      index: 1 as number,
    }
  },
  methods: {
    updatePageIndex(index: number): void {
      this.index = index
    },
    onNextInHobbySelection():void{
      this.updatePageIndex(3);
    },
    onBackInHobbySelection(): void {
      this.updatePageIndex(1);
    }
  },
})
</script>

<style scoped>
</style>