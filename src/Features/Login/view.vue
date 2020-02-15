<template>
  <div class="center-box">
    <div>
      <div
        class="input-box login-input-box"
      >
        <div class="input-title">
          {{ $t('login.username') }}
        </div>
        <div>
          <input
            v-model="username"
            autoFocus
            class="input"
          ></input>
        </div>
      </div>
      <div class="input-box">
        <div class="input-title">
          {{ $t('login.password') }}
        </div>
        <input
          v-model="password"
          type="password"
          class="input"
        ></input>
      </div>

      <div
        class="login-btn-box containerCol vertical"
      >
        <button
          class="normal-btn login-btn"
          @click.prevent="handleLogin"
        >
          {{ $t('login.login') }}
        </button>
        <button class="normal-btn sign-up-btn">
          {{ $t('login.signUp') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';
import { mapState } from 'vuex';

export default {
   name: 'Login',
   data:function () {
      return {
         username:'',
         password:''
      };
   },
   computed:{

      ...mapState({

      })
   },
   methods:{
      handleLogin (){

         /* 检测数据 */
         if(!this.checkName(this.$data.username)){

            this.$modal.show('modal',{ message: this.$t('login.error.name') });
            return;
         }

         if(!this.checkPassword(this.$data.password)){

            this.$modal.show('modal',{ message: this.$t('login.error.password') });
            this.$data.password = '';
            return;
         }

      },

      /* 检测用户名 */
      checkName (name){
         /* 4到16位，字母，数字，下划线，减号 */
         const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
         return pattern.test(name);
      },

      /* 检测密码 */
      checkPassword (password){
      /* 至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号 */
         const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
         return pattern.test(password);
      }
   }
};
</script>
