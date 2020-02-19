import * as types from '../../../Store/mutation-types';

const mutations = {

   /* 加载order */
   [types.LOAD_ORDER] (state,payload){
      state.orders = payload.orders;
   },
};

export default mutations;