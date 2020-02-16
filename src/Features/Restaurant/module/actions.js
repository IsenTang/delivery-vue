import * as types from '../../../Store/mutation-types';
import { set } from '../../../Common/utils';
import router from '../../../Router';
import { loadRestaurant } from '../../../Requests/restaurant';
// import i18n from '../../../i18n';

const actions = {

   async loadRestaurants ({ commit }){
      commit(types.SHOW_LOADING);

      try {
         const restaurants = await loadRestaurant();

         commit(types.LOAD_RESTAURANT,{ restaurants: restaurants.list });
      } catch (error) {

         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   },

   /* 跳转到menu页面 */
   async goMenu ({ commit },{ restaurant }){

      commit(types.SHOW_LOADING);

      commit(types.SAVE_RESTAURANT,{ restaurant });

      set('restaurant',restaurant);

      router.push(`/menu/${restaurant._id}`);

      commit(types.HIDE_LOADING);
   }
};

export default actions;