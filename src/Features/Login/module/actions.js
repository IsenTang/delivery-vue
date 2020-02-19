import { checkLogin,register } from '../../../Requests/login';
import { encode } from '../../../Services/login';
import * as types from '../../../Store/mutation-types';
import { set } from '../../../Common/utils';
import router from '../../../Router';
import i18n from '../../../i18n';

const actions = {

   async login ({ commit },{ username,password }){

      commit(types.SHOW_LOADING);

      try {
         /* check login */
         const user = await checkLogin({ username:encode(username), password:encode(password) });

         commit(types.SAVE_USER,{ user });

         /* 存储user到本地 */
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
   },

   async signUp ({ commit },{ username,password }){

      commit(types.SHOW_LOADING);

      try {

         await register({ username: encode(username),password:encode(password) });
      } catch (error) {

         this._vm.$modal.show('modal',{ message: error.message });
      }finally{

         this._vm.$modal.hide('signUp');

         this._vm.$modal.show('modal',{ message: i18n.t('login.signUpSuccess') });

         commit(types.HIDE_LOADING);
      }

   },

   logout ({ commit }){

      set('user',null);

      commit(types.CLEAR_USER);
   }
};

export default actions;