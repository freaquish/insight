<template>
  <div @click="onClick" class="relative w-12 h-4">
    <div :class="`absolute z-0 w-10 rounded-md ${active ? 'bg-green-200': 'bg-red-200'}  bar`" ></div>
    <div
      :class="`absolute z-10 rounded-full w-4 h-4 ${
        active ? 'bg-green-500 right-0' : 'bg-red-500 left-0'
      } shadow-md`"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  props: {
    active: false as PropOptions<boolean>,
  },
  methods:{
      onClick():void {
          this.$emit('click', !this.active);
      }
  }
})
</script>

<style scoped>
.bar {
  top: 30%;
  left: 10%;
  height: 0.35rem;
}
</style>