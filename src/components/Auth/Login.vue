<template>
  <div id="login" class="row justify-content-center">
    <div class="col-md-5">
      <h4>Login</h4>
      <p>Login and start using this app.</p>
    </div>
    <div class="col-md-5">
      <form class="login-form" v-bind:model="loginForm" v-on:submit.prevent="loginUser">
        <div class="form-group">
          <label for="inputEmail3" class="font-weight-bold col-form-label">Email</label>
          <input
            type="text"
            :class="[errorLog.email?'is-invalid':'is-valid','form-control']"
            id="inputEmail3"
            placeholder="Email"
            autocomplete="new-email"
            v-model="loginForm.email"
          >
          <span class="error text-danger">{{errorLog.email}}</span>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="font-weight-bold col-form-label">Password</label>
          <input
            type="password"
            :class="[errorLog.password?'is-invalid':'is-valid','form-control']"
            id="inputPassword3"
            placeholder="Password"
            autocomplete="new-password"
            v-model="loginForm.password"
          >
          <span class="error text-danger">{{errorLog.password}}</span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-info">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      errorLog: {}
    };
  },
  watch: {
    errorLog(val) {
      this.errorLog = val;
    }
  },
  methods: {
    loginUser() {
      let valid = this.ValidateInput(this.loginForm);
      if (valid) {
        /*perform login*/
      }
    },
    ValidateInput(data) {
      this.errorLog = {};
      if (data.email.length == 0) {
        this.errorLog.email = "Email is required";
        return false;
      } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(data.email)) {
          this.errorLog.email = "Email is not valid";
          return false;
        }
      }
      if (data.password.length == 0) {
        this.errorLog.password = "Password is required";
        return false;
      } else {
        if (data.password.length < 6) {
          this.errorLog.password = "password length must be 6 characters";
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style scoped>
div#login {
  padding-top: 20px;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(93, 213, 226, 0.95)
  );
  height: calc(100vh - 40px);
}
form.login-form {
  background: rgba(18, 158, 158, 0.35);
  padding: 2.5rem;
  border-radius: 0.8rem;
}
</style>