import _ from 'lodash';

import * as types from './mutation-types';

const alert = {

   state:{
      show: false,
      message:'',
      closeFunc: _.noop()
   },
   mutation:{

      /* show alert */
      [types.SHOW_ALERT] (state,payload){
         state.show = true;
         state.message = payload.message,
         state.closeFunc = payload.closeFunc || _.noop();
      },

      /* hide alert */
      [types.HIDE_ALERT] (state){
         state.show = false;
      }
   }
};

export default alert;