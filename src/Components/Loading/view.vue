
<template>
  <div
    v-if="show"
    class="loading-container"
  >
    <div class="loading-opacityContainer" />
    <div class="loading-image-container">
      <img
        src="@/Assets/loading.gif"
        class="loading-image"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import './style.scss';

export default {
   computed:{

      ...mapState({
         show: state=>state.loading.show
      })
   }
};
</script>