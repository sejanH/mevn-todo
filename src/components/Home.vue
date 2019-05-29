<template>
  <div id="app" class="row justify-content-center"></div>
</template>

<script>
export default {
  name: "home",
  created() {
    axios.get("http://mominulhaque.xyz/dashboard/device");
  }
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
  min-height: calc(100vh - 40px);
  max-height: 100vh;
}
</style>