import Vue from 'vue';
import Vuex from 'vuex';

/* global */
import cart from './cart';
import language from './language';
import loading from './loading';

/* modules */
import login from '../Features/Login/module';

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
      login
   }
});
