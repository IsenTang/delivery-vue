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
   }
};
</script>
