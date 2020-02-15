import * as types from '../../../Store/mutation-types';

const mutations = {

   /* 修改语言 */
   [types.SAVE_USER] (state,payload){
      state.user = payload.user;
   },
};

export default mutations;