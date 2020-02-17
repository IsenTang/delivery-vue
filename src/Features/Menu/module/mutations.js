import * as types from '../../../Store/mutation-types';

const mutations = {

   /* 加载菜单 */
   [types.LOAD_MENU] (state,payload){
      state.categories = payload.menu.categories;
      state.foods = payload.menu.foods;
   },

};

export default mutations;