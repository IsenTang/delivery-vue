import { checkLogin } from '../../../Requests/login';
import { encode } from '../../../Services/login';
import * as types from '../../../Store/mutation-types';
import { set } from '../../../Common/utils';
import router from '../../../Router';

const actions = {

   async login ({ commit },{ username,password }){

      commit(types.SHOW_LOADING);

      try {
         /* check login */
         const user = await checkLogin({ username:encode(username), password:encode(password) });

         commit(types.SAVE_USER,{ user });

         set('user',user);

         if(history.length > 1){
            router.back();
         }else{
            router.push('/restaurant');
         }

      } catch (error) {

         this._vm.$modal.show('modal',{ message: error.message });
      }finally{
         commit(types.HIDE_LOADING);
      }
   }
};

export default actions;