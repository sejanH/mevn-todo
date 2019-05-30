<template>
  <div id="app" class="row justify-content-center"></div>
</template>

<script>
export default {
  name: "home",
  
};
</script>

<style scoped>
div#app {
  padding-top: 20px;
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.85),
    rgba(93, 213, 226, 0.95)
  );
  min-height: calc(100vh - 41px);
  max-height: 100vh;
}
</style>