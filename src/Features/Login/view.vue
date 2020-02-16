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
        <button
          class="normal-btn sign-up-btn"
          @click.prevent="showSignUp"
        >
          {{ $t('login.signUp') }}
        </button>
      </div>
    </div>

    <!-- sign up modal -->
    <modal
      name="signUp"
      height="auto"
    >
      <div
        class="sign-up-modal containerCol vertical space-between"
      >
        <div class="sign-up-type-in">
          <div class="input-box sign-up-type-input">
            <div class="input-title">
              {{ $t('login.username') }}
            </div>
            <input
              v-model="signUpName"
              class="input"
              autoFocus
            ></input>
          </div>
          <div
            class="input-box sign-up-type-input"
          >
            <div class="input-title">
              {{ $t('login.password') }}
            </div>
            <input
              v-model="signUpPassword"
              class="input"
              type="password"
            ></input>
          </div>
          <div
            class="input-box sign-up-type-input"
          >
            <div class="input-title">
              {{ $t('login.confirmPassword') }}
            </div>
            <input
              v-model="comfirmSignUpPassword"
              class="input"
              type="password"
            ></input>
          </div>
        </div>
        <div class="containerCol vertical space-between sign-up-btn-box">
          <button
            class="normal-btn login-btn"
            @click.prevent="handleSignUp"
          >
            {{ $t('login.signUp') }}
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
/* style */
import './style.scss';
import { mapState,mapActions } from 'vuex';

export default {
   name: 'Login',
   data:function () {
      return {
         username:'',
         password:'',
         signUpName:'',
         signUpPassword:'',
         comfirmSignUpPassword:''
      };
   },
   computed:{

      ...mapState({

      })
   },
   methods:{
      ...mapActions([
         'login',
         'signUp'
      ]),
      handleLogin (){

         const username = this.$data.username;

         const password = this.$data.password;

         /* 检测数据 */
         if(!this.checkName(username)){

            this.$modal.show('modal',{ message: this.$t('login.error.name') });
            return;
         }

         if(!this.checkPassword(password)){

            this.$modal.show('modal',{ message: this.$t('login.error.password') });
            this.$data.password = '';
            return;
         }

         /* 登录 */
         this['login']({ username,password });

      },

      /* 显示注册modal */
      showSignUp (){
         this.$modal.show('signUp');
      },

      /* 注册 */
      handleSignUp (){

         const username = this.$data.signUpName;

         const password = this.$data.signUpPassword;

         const confirmPassword = this.$data.comfirmSignUpPassword;

         /* 检测数据 */
         if(!this.checkName(username)){

            this.$modal.show('modal',{ message: this.$t('login.error.name') });
            return;
         }

         if(!this.checkPassword(password)){

            this.$modal.show('modal',{ message: this.$t('login.error.password') });
            this.$data.signUpPassword = '';
            this.$data.comfirmSignUpPassword = '';
            return;
         }

         if(password !== confirmPassword){

            this.$modal.show('modal',{ message: this.$t('login.error.comfirmPassword') });
            this.$data.signUpPassword = '';
            this.$data.comfirmSignUpPassword = '';
            return;
         }

         /* 注册 */
         this.signUp({ username,password });
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
