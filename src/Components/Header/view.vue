<template>
  <div>
    <div class="header">
      <div class="containerBetween vertical left">
        <img
          class="logo"
          src="@/Assets/logo.png"
          @click="goRestaurant"
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
          :close="closeDropDown"
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
      },
      closeDropDown (){

         this.$data.show = false;
      },
      goRestaurant (){

         this.$router.push('/restaurant');
      }
   }
};
</script>