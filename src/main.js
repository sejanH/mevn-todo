/* eslint-disable */
try {
  window.Popper = require('popper.js').default;
  window.$ = window.jQuery = require('jquery');
  require('bootstrap');
} catch (e) { }

window.axios = require('axios');
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'



import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'


Vue.use(Router)


Vue.config.productionTip = false
/* Components */
import Home from './components/Home'
import Todo from './components/Todo'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

const routes = [
  {
    name: 'home', path: '/', component: Home,
    meta: {
      title: 'Home', requiresAuth: false
    }
  },
  {
    name: 'todo', path: '/todo-list', component: Todo, meta: { title: 'Todo-List', requiresAuth: true }
  },
  {
    name: 'login', path: '/login', component: Login, meta: { title: 'Login', requiresAuth: false }
  },
  {
    name: 'signup', path: '/join', component: Signup, meta: { title: 'Signup', requiresAuth: false }
  },
  // { 
  //   name:'logout',path:'/logout',beforeEnter(){
  //     let user = localStorage.getItem('user');
  //     let token = localStorage.getItem('token');
  //     if(user == null && token == null){
  //         //do nothing
  //       }
  //       else{
  //         localStorage.clear();
  //       }
  //     }, meta: { title: 'Logout', requiresAuth: true}
  //   }
];

const router = new Router({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }
  else {
    if (localStorage.getItem('token') != null && (to.matched.some(record => record.name == 'login') || to.matched.some(record => record.name == 'signup'))) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  }
});
router.afterEach((to, from) => {
  document.title = to.meta.title || 'Welcome';
  //$('#navbar-collapse').collapse('hide');
});
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
