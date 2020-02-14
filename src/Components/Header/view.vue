<template>
  <div>
    <div class="header">
      <div class="containerBetween vertical left">
        <img
          class="logo"

          src="@/Assets/logo.png"
        />
      </div>
      <div class="profile">
        <img
          class="profile-logo"
          src="@/Assets/profile-icon.png"
          @click="showProfile"
        />
        <ProfileDropDown
          v-if="isShow"
        />
        </profiledropdown>
      </div>
    </div>
    <div
      id="header-children"
      class="header-children"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import './style.scss';
import ProfileDropDown from './components/ProfileDropDown.vue';

export default {
   name:'Header',
   components:{
      ProfileDropDown
   },
   data:function () {
      return {
         /* 显示profileDropDown */
         show: false
      };
   },
   computed:{

      isShow (){

         return this.$data.show;
      }
   },
   methods:{

      showProfile (){
         this.$data.show = true;
      }
   }
};
</script>