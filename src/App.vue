<template>
  <div id="app">
    <Navbar :key="$route.fullPath"></Navbar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from "./components/Partials/Navbar";
  export default {
    name: "app",
    components: { Navbar },
    data(){
      return{
        isLogged: this.checkIfIsLogged()
      }
    },
    watch:{
      isLogged(val){
        this.isLogged = val;
      }
    },
    methods:{
      forceRerender() {
        this.isLogged = this.checkIfIsLogged ();  
      },
      checkIfIsLogged () {
        let token = localStorage.getItem('token')
        if (token) {
          return true
        } else {
          return false
        }
      }
    },
    mounted(){
      this.checkIfIsLogged();
    }
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
