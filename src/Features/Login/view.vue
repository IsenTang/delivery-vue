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
          type="password"

          class="input"
        ></input>
      </div>

      <div
        class="login-btn-box containerCol vertical"
      >
        <button class="normal-btn login-btn">
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

   computed:{

      ...mapState({

      })
   }
};
</script>
