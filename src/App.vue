<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Partials/Navbar";
export default {
  name: "app",
  components: { Navbar }
};
</script>
<style>
html,
body {
  margin: 0;
}

.bg-mevn {
  /* background: rgba(93, 219, 226,1);*/
  background: rgba(93, 213, 226, 1);
}
</style>
