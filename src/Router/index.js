import Vue from 'vue';
import _ from 'lodash';
import VueRouter from 'vue-router';
import { get } from '../Common/utils';
import Login from '../Features/Login/view.vue';
import Restaurant from '../Features/Restaurant/view.vue';

Vue.use(VueRouter);

const routes = [
   {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter:(to,from,next)=>{

         /* 如果登录,直接跳转到restaurant页面 */
         if(!_.isEmpty(_.get(get('user'),'token'))){
            next({
               path:'restaurant'
            });
         }else{
            next();
         }
      }
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

/* 登录态检测 */
router.beforeEach((to,from,next)=>{

   const requiresAuth = to.meta.requiresAuth;

   /* 如果不需要登录验证，直接通过 */
   if(!requiresAuth){

      next();
   }else{
      /* 如果没登录,直接跳转到restaurant页面 */
      if(_.isEmpty(_.get(get('user'),'token'))){
         next({
            path:'restaurant'
         });
      }
   }
});

export default router;
