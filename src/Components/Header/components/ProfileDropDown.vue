<template>
  <div
    ref="profile-dropDown"
    class="profile-drop-down"
  >
    <button
      v-if="loginShow"
      class="profile-button"
      type="button"
    >
      {{ $t('login.login') }}
    </button>

    <button
      v-if="orderShow"
      class="order-btn"
      type="button"
    >
      {{ $t('order.title') }}
    </button>

    <div class="language-button">
      <LanguageButton
        v-for="lang in langs"
        :key="lang.key"
        :lang="lang"
      />
    </div>

    <button
      v-if="logoutShow"
      class="profile-button log-out"
      type="button"
    >
      {{ $t('logout') }}
    </button>
  </div>
</template>

<script>
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { mapState } from 'vuex';

/* components */
import LanguageButton from './LanguageButton.vue';

export default {
   components:{
      LanguageButton
   },

   props:{
      close: {
         type: Function,
         required:true
      }
   },
   data:function () {
      return {
         langs:[
            { code: 'zh', show: '中',key: uuidv4() },
            { code: 'en', show: 'En',key:  uuidv4() }
         ]
      };
   },

   computed:{
      loginShow (){

         const path = this.$router.currentRoute.path;

         return !(!_.isEmpty(this.user) || (path == '/login'));
      },
      orderShow (){

         const path = this.$router.currentRoute.path;

         return !_.isEmpty(this.user) && (path !== '/order');
      },
      logoutShow (){

         return !_.isEmpty(this.user);
      },
      ...mapState({
         user: state=>state.login.user
      })
   },

   mounted (){

      /* 增加listener，点击关闭 */
      document.addEventListener('mousedown', this.handleClickOutside,true);
   },

   destroyed (){

      /* 移除listener */
      document.removeEventListener('mousedown', this.handleClickOutside,true);
   },

   methods:{

      handleClickOutside (e){

         const ref = this.$refs['profile-dropDown'];

         if (ref &&
         !ref.contains(e.target) &&
         e.target.className !== 'profile-logo') {

            this.$props['close']();
         }

      }
   },

};
</script>