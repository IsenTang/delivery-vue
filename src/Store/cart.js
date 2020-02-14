import { get } from '../Common/utils';
import * as types from './mutation-types';

const cart = {

   state:{
      cart: get('cart') || []
   },
   mutations:{

      /* save cart */
      [types.SAVE_CART] (state,payload){
         state.cart = payload.cart;
      },

      /* clear cart */
      [types.CLEAR_CART] (state){
         state.cart = [];
      }
   }
};

export default cart;