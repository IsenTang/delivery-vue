import Vue from 'vue'
import Vuex from 'vuex'

/* global */
import alert from './alert';
import cart from './cart';
import error from './error';
import language from './language';
import loading from './loading';


/* modules */
import login from '../Features/Login/module';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    cart,
    error,
    language,
    loading,
    login
  }
})
