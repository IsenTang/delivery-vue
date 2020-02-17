import * as types from '../../../Store/mutation-types';
// import { set } from '../../../Common/utils';
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
   }
};

export default actions;