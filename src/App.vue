<template>
  <div id="app">
    <Navbar :key="$route.fullPath"></Navbar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
export default {
  name: "app",
  components: { Navbar, Footer },
  data() {
    return {
      isLogged: this.checkIfIsLogged()
    };
  },
  watch: {
    isLogged(val) {
      this.isLogged = val;
    }
  },
  methods: {
    forceRerender() {
      this.isLogged = this.checkIfIsLogged();
    },
    checkIfIsLogged() {
      let token = localStorage.getItem("token");
      if (token) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
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
button.bg-mevn,
input[type="submit"].bg-mevn {
  background: #0ac18e;
  color: white;
}
/*Navbar style*/
.navbar {
  padding: 0rem 1rem;
  border-bottom: 1px solid lightgrey;
}
.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
}
.nav-item > .router-link-exact-active {
  background: rgba(72, 195, 202, 1);
}
/*Footer*/
#footer {
  clear: both;
  margin-top: -24px;
  position: relative;
  bottom: 0;
  text-align: center;
}
</style>
