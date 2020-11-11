<template>
  <div class="w-full h-full py-4 flex flex-col px-6">
    <!-- Header -->
    <div class="w-full flex flex-col overflow-hidden  rounded-md shadow-lg pt-3 pb-3 px-2">
      <p class="font-muli font-bold text-2xl">Uploads</p>
      <p class="font-lato font-sm text-gray-700 break-words leading-5"> Please do not leave this page untill the uploads are complete. We need your support to deliver the original content</p>
      <div v-if="this.totalProgress > 0" class="w-full h-2 mt-4 rounded-full bg-gray-300">
        <div
          class="w-full h-2 rounded-md bg-purple-600"
          :style="`width: ${totalProgress}%;`"
        ></div>
      </div>
    </div>

    <!-- Body -->
    <div class="w-full mt-3 flex flex-col h-full py-2">
      <div v-for="progress in progression" :key="progression.indexOf(progress)">
        <UploadMeter :progress="progress" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import { ProgressAsset } from '@/plugins/FirebasePlugin'
import UploadMeter from '@/components/post_elements/UploadMeter.vue'

export default Vue.extend({
  components: {
    UploadMeter
  },
  mounted(){
    this.$nextTick().then(() => {
      this.createPost()
    })
  },
  data() {
    return {
        
    }
  },
  computed: {
    ...mapState('post/create_post', ['progression']),
    totalProgress(): number {
      let total = 0.0
      for (let index = 0; index < this.progression.length; index++) {
        total += this.progression[index].progress
      }
      return total / this.progression.length
    }
  },
  methods: {
    ...mapActions("post/create_post",['createPost'])
  }
})
</script>

<style scoped></style>
