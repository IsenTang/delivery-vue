import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './Router';
import store from './Store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(VModal,{ dynamic: true,injectModalsContainer: true });
new Vue({
   router,
   store,
   i18n,
   render: h => h(App)
}).$mount('#app');

