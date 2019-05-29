<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-mevn">
    <div class="container">
      <router-link class="navbar-brand" to="/">Home</router-link>
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
          <!-- <li class="nav-item">
					<router-link class="nav-link" to="home">Home</router-link>
          </li>-->
          <li class="nav-item">
            <router-link class="nav-link" to="/todo-list">My Todo-List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/join">Signup</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar"
};
</script>
<style>
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
</style>