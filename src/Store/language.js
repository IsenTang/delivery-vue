import { get,set } from '../Common/utils';
import * as types from './mutation-types';
import i18n from '../i18n';

const language = {
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

         commit(types.SHOW_LOADING);
         commit(types.CHANGE_LANGUAGE,{ language });
         i18n.locale = language;

         commit(types.HIDE_LOADING);

         set('language',language);
      }
   }
};

export default language;