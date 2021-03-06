import Vue from 'vue';
import Vuex from 'vuex';

/* global */
import cart from './cart';
import language from './language';
import loading from './loading';

/* modules */
import login from '../Features/Login/module';
import restaurant from '../Features/Restaurant/module';
import menu from '../Features/Menu/module';
import order from '../Features/Order/module';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
   },
   mutations: {
   },
   actions: {
   },
   modules: {
      cart,
      language,
      loading,
      login,
      restaurant,
      menu,
      order
   }
});
