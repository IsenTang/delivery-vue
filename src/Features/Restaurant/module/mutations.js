import * as types from '../../../Store/mutation-types';

const mutations = {

   /* 加载饭店 */
   [types.LOAD_RESTAURANT] (state,payload){
      state.restaurants = payload.restaurants;
   },
   /* 保存饭店 */
   [types.SAVE_RESTAURANT] (state,payload){
      state.restaurant = payload.restaurant;
   }
};

export default mutations;