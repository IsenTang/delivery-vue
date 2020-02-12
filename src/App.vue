<template>
  <div id="app">
    <router-view />
    <Loading />
  </div>
</template>

<script>
import Loading from './Components/Loading/view.vue';
import './index.scss';

export default {
   components: {
      Loading
   }
};
</script>
