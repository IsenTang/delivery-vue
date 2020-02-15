import { checkLogin } from '../../../Requests/login';
import { encode } from '../../../Services/login';
import * as types from '../../../Store/mutation-types';
import { set } from '../../../Common/utils';

const actions = {

   async login ({ commit },{ username,password }){

      commit(types.SHOW_LOADING,null,{ root: true });

      try {
         /* check login */
         const user = await checkLogin({ username:encode(username), password:encode(password) });

         console.log(user);
         commit(types.SAVE_USER,{ user });

         set('user',user);

      } catch (error) {

         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING,null,{ root: true });
      }
   }
};

export default actions;