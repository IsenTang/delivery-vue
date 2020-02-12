import { get } from '../Common/utils';
import * as types from './mutation-types';

const language = {

   state:{
      language: get('language') || 'zh'
   },
   mutation:{

      /* 修改语言 */
      [types.CHANGE_LANGUAGE] (state,payload){
         state.language = payload.language;
      },

   }
};

export default language;