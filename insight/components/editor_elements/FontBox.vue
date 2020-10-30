<template>
  <div
    class="px-2 py-2"
    @click="$emit('font-selected', font)"
  >
    <p class="text-base text-white font-bold" style="white-space:nowrap;">{{font}}</p>
  </div>
</template>

<script>
export default {
  props: ['font'],
  mounted(){
      this.patchChanges();
  },
  updated() {
      this.patchChanges();
  },
  methods: {
    patchChanges: function() {
      this.$el.style.setProperty('font-family', this.font)
    }
  }
}
</script>
