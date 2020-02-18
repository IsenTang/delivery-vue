<template>
  <div class="App">
    <Header>
      <router-view />
      <Loading />
      <CustomModal />
    </Header>
  </div>
</template>

<script>
import Loading from './Components/Loading/view.vue';
import Header from './Components/Header/view.vue';
import CustomModal from './Components/Modal/view.vue';
import './index.scss';

export default {
   components: {
      Header,
      Loading,
      CustomModal
   },
   created () {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store') ) {
         this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem('store'))));
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload',()=>{
         sessionStorage.setItem('store',JSON.stringify(this.$store.state));
      });
   }
};
</script>
