<template>
  <div id="signup" class="row justify-content-center">
    <div class="col-md-5 website">
      <h4>Help me learn better</h4>
      <p>
        Join this site and share your feedbacks with me.
        <br>Your feedbacks will be very helpful to improve
      </p>
      <p>
        Though it is a simple website, I am still learning.
        <br>To learn
        <strong title="M=Mongo, E=Express, V=Vue, N=Node">MEVN Stack</strong> I made this app for the first time.
      </p>
    </div>
    <div class="col-md-5">
      <u style="color: maroon ;font-weight:600">
        Signup
        <small>(All fields are mandatory)</small>
      </u>
      <form class="signup-form" v-bind:model="signupForm" v-on:submit.prevent="CreateNewUser">
        <div class="form-group">
          <label for="email" class="col-form-label font-weight-bold">Email</label>
          <input
            type="text"
            name="email"
            :class="[errorMsg.email?'is-invalid':'is-valid','form-control']"
            id="email"
            placeholder="Your valid email"
            autocomplete="new-email"
            v-model="signupForm.email"
          >
          <span class="error" v-if="errorMsg.email">{{errorMsg.email}}</span>
        </div>
        <div class="form-group">
          <label for="name" class="col-form-label font-weight-bold">Name</label>
          <input
            type="text"
            :class="[errorMsg.name?'is-invalid':'is-valid','form-control']"
            id="name"
            name="name"
            placeholder="Your Full Name"
            autocomplete="new-password"
            v-model="signupForm.name"
          >
          <span class="error" v-if="errorMsg.name">{{errorMsg.name}}</span>
        </div>
        <div class="form-group">
          <label for="password" class="col-form-label font-weight-bold">Password</label>
          <input
            type="password"
            name="password"
            :class="[errorMsg.password?'is-invalid':'is-valid','form-control']"
            id="password"
            placeholder="Password must be 6 characters long"
            autocomplete="new-password"
            v-model="signupForm.password"
          >
          <span class="error" v-if="errorMsg.password">{{errorMsg.password}}</span>
        </div>
        <div class="form-group">
          <label for="cpassword" class="col-form-label font-weight-bold">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            :class="[errorMsg.cpassword?'is-invalid':'is-valid','form-control']"
            id="cpassword"
            placeholder="Enter Password Again"
            autocomplete="new-password"
            v-model="signupForm.cpassword"
          >
          <span class="error" v-if="errorMsg.cpassword">{{errorMsg.cpassword}}</span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-outline-danger">Join Now !</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import swal from "sweetalert";
import { log } from "util";
export default {
  name: "signup",
  data() {
    return {
      signupForm: {
        email: "",
        name: "",
        password: "",
        cpassword: ""
      },
      errorMsg: {}
    };
  },
  watch: {
    errorMsg(val) {
      this.errorMsg = val;
    }
  },
  methods: {
    CreateNewUser() {
      let valid = true;//this.Validated(this.signupForm);
      if (valid == true) {
        axios
          .post("http://localhost:8081/user/signup", this.signupForm)
          .then(response => {
            if (response.data.id != -1) {
              swal({
                icon: "success",
                timer: 1500
              });
              this.signupForm = {
                email: "",
                name: "",
                password: "",
                cpassword: ""
              };
              this.errorMsg = {};
            }
          })
          .catch(error => {
            console.log(error);
            this.errorMsg = {};
            if (error.request.response != -1) {
              JSON.parse(error.request.response).forEach(value => {
                this.errorMsg[value.param] = value.msg;
              });
            } else {
              this.errorMsg["email"] = "This email already exists";
            }
          });
      }
    },
    Validated(data) {
      this.errorMsg = {};
      for (let index in data) {
        if (data[index].length == 0) {
          if (index != "cpassword") {
            this.errorMsg[index] = index + " is required";
          } else {
            this.errorMsg[index] = "confirm password is required";
          }
          return false;
        }
      }
      //if (data.email.length > 0) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(data.email)) {
        this.errorMsg.email = "Email is not valid";
        return false;
      }
      if (data.password.length < 6) {
        this.errorMsg.password = "password length must be 6 characters";
        return false;
      }
      if (data.password != data.cpassword) {
        this.errorMsg.cpassword = "Passwords don't match";
        return false;
      }
      //	}

      return true;
    }
  }
};
</script>


<style scoped>
div#signup {
  padding-top: 20px;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2),
    rgba(93, 213, 226, 0.95)
  );
  min-height: calc(100vh - 41px);
  max-height: 100vh;
}
form.signup-form {
  background: rgba(106, 122, 120, 0.35);
  padding: 1.25rem;
  border-radius: 0.8rem;
}
.form-group {
  margin-bottom: 0.2rem;
}
.col-form-label {
  padding-top: calc(0.2rem + 1px);
  padding-bottom: calc(0.2rem + 1px);
}
.error {
  text-transform: capitalize;
  font-weight: 400;
  color: cyan;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
@media only screen and (max-width: 420px){
div.website{
visibility: hidden;display: none;
}
}
</style>