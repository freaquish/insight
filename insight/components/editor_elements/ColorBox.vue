<template>
    <div class="px-4 py-4 rounded-full mx-1" @click="$emit('color-selected', color)"></div>
</template>

<script>
export default {
    props:['color'],
    mounted(){
        this.$el.style.setProperty('background-color',this.color);
    }
}
</script>