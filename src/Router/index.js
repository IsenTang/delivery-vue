import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../Features/Login/view.vue';
import Restaurant from '../Features/Restaurant/view.vue';

Vue.use(VueRouter);

const routes = [
   {
      path: '/login',
      name: 'Login',
      component: Login
   },
   {
      path:'/restaurant',
      name:'Restaurant',
      component: Restaurant
   }
];

const router = new VueRouter({
   routes
});

export default router;
