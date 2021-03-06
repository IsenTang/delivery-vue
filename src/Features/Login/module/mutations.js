import * as types from '../../../Store/mutation-types';

const mutations = {

   /* 保存用户 */
   [types.SAVE_USER] (state,payload){
      state.user = payload.user;
   },

   /* 清除用户 */
   [types.CLEAR_USER] (state){
      state.user = null;
   },
};

export default mutations;