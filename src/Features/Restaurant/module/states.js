import { get } from '../../../Common/utils';

const state = {
   restaurants:[],
   restaurant:get('restaurant') || null
};

export default state;