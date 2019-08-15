<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-mevn">
    <div class="container">
      <router-link class="navbar-brand" to="/">To Do List</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li
            :class="[nav.name=='todo' ? 'dropdown':'',' nav-item']"
            v-bind:key="nav.name"
            v-for="nav in NavLinks"
          >
            <router-link
              v-if="nav.show == true && nav.name!='todo'"
              class="nav-link"
              :to="{name:nav.name}"
            >{{nav.title}}</router-link>
            <span v-else-if="nav.show == true && nav.name=='todo'" class="input-group">
              <router-link class="nav-link input-group-prepend" :to="{name:nav.name}">{{nav.title}}</router-link>
            </span>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a href="#logout" class="nav-link" v-on:click="doLogout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "navbar",
  data() {
    return {
      NavLinks: [],
      isLogged: this.checkIfIsLogged()
    };
  },
  created() {
    this.checkIfIsLogged();
    this.$router.options.routes.forEach(route => {
      if (!route.meta.hideFromNav) {
        if (route.name == "login" || route.name == "signup") {
          if (localStorage.getItem("token") == null) {
            this.NavLinks.push({
              name: route.name,
              title: route.meta.title,
              show: true
            });
          } else {
            this.NavLinks.push({
              name: route.name,
              title: route.meta.title,
              show: false
            });
          }
        } else if (
          localStorage.getItem("token") == null &&
          (route.name != "login" || route.name != "signup") &&
          route.meta.requiresAuth == true
        ) {
          this.NavLinks.push({
            name: route.name,
            title: route.meta.title,
            show: false
          });
        } else {
          this.NavLinks.push({
            name: route.name,
            title: route.meta.title,
            show: true
          });
        }
      }
    });
  },
  methods: {
    doLogout() {
      swal("Are you sure?", {
        buttons: {
          cancel: "No! Abort! Abort",
          Logout: {
            text: "Yes! Logout",
            value: "logout"
          }
        }
      }).then(value => {
        switch (value) {
          case "logout":
            let token = localStorage.getItem("token");
            if (token == null) {
              swal({ text: "No login info found", button: false, timer: 1000 });
            } else {
              swal({ text: "Logged out!", button: false, timer: 1000 });
              localStorage.removeItem("token");
              this.$router.push({ path: "/" });
            }
            break;

          default:
            swal({ text: "Logout cancelled!", button: false, timer: 1000 });
        }
      });
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
    this.$root.$on("expired", () => {
      swal({ text: "Session expired!", button: false, timer: 1000 });
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
    });
  }
};
</script>