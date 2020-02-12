import _ from 'lodash';
import * as types from './mutation-types';

const error = {

   state:{
      show: false,
      message: '',
      closeFunc: _.noop()
   },
   mutation:{

      /* show error */
      [types.SHOW_ERROR] (state,payload){
         state.show = true;
         state.message = payload.message;
         state.closeFunc = payload.closeFunc;
      },

      /* hide error */
      [types.HIDE_ERROR] (state){
         state.show = false;
      }
   }
};

export default error;