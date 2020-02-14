import { get,set } from '../Common/utils';
import * as types from './mutation-types';

const language = {
   namespaced: true,
   state:{
      language: get('language') || 'zh'
   },
   mutations:{

      /* 修改语言 */
      [types.CHANGE_LANGUAGE] (state,payload){
         state.language = payload.language;
      },
   },
   actions:{

      changeLanguage ({ commit },{ language }){

         commit(types.SHOW_LOADING,null,{ root: true });
         commit(types.CHANGE_LANGUAGE,{ language });
         commit(types.HIDE_LOADING,null,{ root: true });

         set('language',language);
      }
   }
};

export default language;