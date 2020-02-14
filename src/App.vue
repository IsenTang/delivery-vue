<template>
  <div class="App">
    <Header>
      <router-view />
      <Loading />
    </Header>
  </div>
</template>

<script>
import Loading from './Components/Loading/view.vue';
import Header from './Components/Header/view.vue';
import './index.scss';

export default {
   components: {
      Header,
      Loading
   }
};
</script>
