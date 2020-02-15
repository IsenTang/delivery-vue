import { get } from '../../../Common/utils';

const state = {

   show:false,
   user:get('user') || {}
};

export default state;