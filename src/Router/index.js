import Vue from 'vue';
import _ from 'lodash';
import VueRouter from 'vue-router';
import { get } from '../Common/utils';

/* pages */
import Login from '../Features/Login/view.vue';
import Restaurant from '../Features/Restaurant/view.vue';
import Menu from '../Features/Menu/view.vue';
import Order from '../Features/Order/view.vue';

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
   },
   {
      path:'/menu/:restId',
      name:'Menu',
      component: Menu,
      props: true
   },
   {
      path:'/order',
      name:'Order',
      component: Order
   },{
      path:'*',
      redirect:'/restaurant',
   }
];

const router = new VueRouter({
   mode:'history',
   routes,
   /* 新页面滚动到头部 */
   scrollBehavior () {
      // if (savedPosition) {
      //    return savedPosition;
      // } else {

      // return { x: 0, y: 0 };

      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({ x: 0, y: 0 });
         }, 500);
      });
      // }
   }
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
