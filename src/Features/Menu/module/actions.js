import _ from 'lodash';
import * as types from '../../../Store/mutation-types';
import { get,set,mockTimeout } from '../../../Common/utils';
import router from '../../../Router';
import i18n from '../../../i18n';
import store from '../../../Store';

/* request */
import { placeOrderRequest } from '../../../Requests/order';
import { loadMenu as requestMenu } from '../../../Requests/menu';

const actions = {

   async loadMenu ({ commit },{ restaurantId }){

      commit(types.SHOW_LOADING);

      try {
         const menu = await requestMenu({ restaurantId });

         commit(types.LOAD_MENU,{ menu });
      } catch (error) {
         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   },

   /* 添加购物车 */
   async addCart ({ commit },{ food,cartId }){

      commit(types.SHOW_LOADING);

      let cart = [];
      try {
         if (food.totalPrice === undefined) {

            food.totalPrice = food.price;
         }

         /* 获取购物车 */
         if (_.isEmpty(get('cart'))) {
            cart = [];
         } else {
            cart = get('cart');
         }

         /* 往cart加入食物 */
         cart.push(food);

         commit(types.SAVE_CART, { cart });

         /* 往本地存cart信息 */
         set('cart', cart);

         if(!_.isUndefined(cartId)){
            set('cartId', cartId);
         }
      } catch (error) {
         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   },

   /* 从购物车减少食物 */
   removeCart ({ commit },{ food }){

      commit(types.SHOW_LOADING);

      let cart = [];
      try {

         if (food.totalPrice === undefined) {

            food.totalPrice = food.price;
         }

         /* 获取购物车 */
         if (_.isEmpty(get('cart'))) {
            cart = [];
         } else {
            cart = get('cart');
         }

         /* 找到对应食物 */
         const spliceIndex = _.findLastIndex(cart, (item) =>
            item._id  === food._id);

         /* 剔除 */
         cart.splice(spliceIndex, 1);

         commit(types.SAVE_CART, { cart });

         /* 往本地存cart信息 */
         set('cart', cart);

      } catch (error) {
         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   },

   async checkout ({ commit }){

      commit(types.SHOW_LOADING);

      const user = _.get(store.state,'login.user');

      const restaurant = _.get(store.state,'restaurant.restaurant');

      /* 没登录 */
      if(!user){
         this._vm.$modal.show('modal',{ message: i18n.t('error.need-login'),closeFunc:()=>{
            router.push('/login');
         } });
         commit(types.HIDE_LOADING);

         return;
      }

      try {

         /* 组织数据 */
         const data = {
            payment:_.get(get('payment'),'value'),
            cart:_.get(store.state,'cart.cart'),
            userId:_.get(user,'_id'),
            restaurantId:_.get(restaurant,'_id')
         };

         /* 发送下单请求 */
         await placeOrderRequest(data);

         /* 成功后，清空购物车 */
         commit(types.CLEAR_CART);
         set('cart',[]);

         /* 模拟时间 */
         await mockTimeout(2000);

         /* 成功后跳转至用户订单页面 */
         router.push('/order');
      } catch (error) {

         if(error.code === 'auth-failed'){
            this._vm.$modal.show('modal',{ message: error.message,closeFunc:()=>{
               router.push('/login');
            } });
         }else{
            this._vm.$modal.show('modal',{ message: error.message });
         }

      }finally{
         commit(types.HIDE_LOADING);
      }
   }
};

export default actions;