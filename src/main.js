import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'
window.jQuery = window.$ = require('jquery')
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(Router);
Vue.config.productionTip = false
/* Components */
import Home from './components/Home'
const routes = [
  {
    name: 'home', path: '/home', component: Home, meta: { requiresAuth: true }
  }
];

const router = new Router({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
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
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
