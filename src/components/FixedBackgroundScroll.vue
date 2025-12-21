<template>
  <div class="fixed-background-scroll-container">
    <div class="fixed-background" :style="{ top: topOffset }"></div>

    <div class="content-wrapper" :style="{ 'margin-top': topOffset }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedBackgroundScroll',
  props: {
    // topOffset prop: Defines how far from the top of the viewport the fixed background should start.
    // This allows you to place the effect after a header or other component.
    // It expects a string value (e.g., '80px', '10vh').
    topOffset: {
      type: String,
      default: '0px', // Default to 0px, meaning it starts from the very top if no offset is provided.
    },
  },
};
</script>

<style scoped>
/*
  The 'scoped' attribute ensures these styles only apply to this component.
  All styling here is standard CSS.
*/

.fixed-background-scroll-container {
  /* This container acts as a general wrapper. No special positioning here. */
  width: 100%;
}

.fixed-background {
  position: fixed; /* Makes it stay in place relative to the viewport */
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-position: center; /* Centers the image */
  z-index: -1; /* Puts it behind the scrolling content */
  /* 'top' is dynamically set via the prop */
  background-image: url(../images/image-asset.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
}

.content-wrapper {
  position: relative;
  z-index: 10; 
  
}
</style>
