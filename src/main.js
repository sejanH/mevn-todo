/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'
window.jQuery = window.$ = require('jquery')
import 'bootstrap'
// import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(Router);
Vue.config.productionTip = false
/* Components */
import Home from './components/Home'
import Todo from './components/Todo'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
const routes = [
  {
    name: 'home', path: '/home', component: Home,
    meta: {
      title: 'Home', requiresAuth: true
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
  }
];

const router = new Router({
  mode: 'history',
  routes
});
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});*/
router.afterEach((to, from) => {
  document.title = to.meta.title || 'Welcome';
});
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
