import _ from 'lodash';
import * as types from '../../../Store/mutation-types';
import { get,set } from '../../../Common/utils';
// import router from '../../../Router';
import { loadMenu as requestMenu } from '../../../Requests/menu';
// import i18n from '../../../i18n';

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
   }
};

export default actions;