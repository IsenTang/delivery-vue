import _ from 'lodash';
import * as types from '../../../Store/mutation-types';
import { loadOrder } from '../../../Requests/order';
import { get } from '../../../Common/utils';
// import router from '../../../Router';
// import i18n from '../../../i18n';

const actions = {

   async loadOrders ({ commit }){

      commit(types.SHOW_LOADING);

      try {

         const userId = _.get(get('user'),'_id');

         const orders = await loadOrder(userId);

         commit(types.LOAD_ORDER,{ orders:orders.list });

      } catch (error) {

         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   }
};

export default actions;