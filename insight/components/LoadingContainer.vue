<template>
  <div class="w-screen h-full min-h-screen grad">
    <div
      v-if="this.loading"
      class="w-full h-screen flex flex-col justify-center"
    >
      <div class="w-full flex justify-center">
        <div class="swapping-squares-spinner" :style="spinnerStyle">
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading'],
}
</script>

<style scoped>

.grad {
  background-image: linear-gradient(to right, #382645 , #282639);
}
.swapping-squares-spinner, .swapping-squares-spinner * {
      box-sizing: border-box;
    }

    .swapping-squares-spinner {
      height: 65px;
      width: 65px;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .swapping-squares-spinner .square {
      height: calc(65px * 0.25 / 1.3);
      width:  calc(65px * 0.25 / 1.3);
      animation-duration: 1000ms;
      border: calc(65px * 0.04 / 1.3) solid #ff1d5e;
      margin-right: auto;
      margin-left: auto;
      position: absolute;
      animation-iteration-count: infinite;
    }

    .swapping-squares-spinner .square:nth-child(1) {
      animation-name: swapping-squares-animation-child-1;
      animation-delay: 500ms;
    }

    .swapping-squares-spinner .square:nth-child(2) {
      animation-name: swapping-squares-animation-child-2;
      animation-delay: 0ms;
    }

    .swapping-squares-spinner .square:nth-child(3) {
      animation-name: swapping-squares-animation-child-3;
      animation-delay: 500ms;
    }

    .swapping-squares-spinner .square:nth-child(4) {
      animation-name: swapping-squares-animation-child-4;
      animation-delay: 0ms;
    }

    @keyframes swapping-squares-animation-child-1 {
      50% {
        transform: translate(150%,150%) scale(2,2);
      }
    }

    @keyframes swapping-squares-animation-child-2 {
      50% {
        transform: translate(-150%,150%) scale(2,2);
      }
    }

    @keyframes swapping-squares-animation-child-3 {
      50% {
        transform: translate(-150%,-150%) scale(2,2);
      }
    }

    @keyframes swapping-squares-animation-child-4 {
      50% {
        transform: translate(150%,-150%) scale(2,2);
      }
    }
</style>