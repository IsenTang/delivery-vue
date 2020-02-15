<template>
  <modal
    name="modal"
    @before-open="beforeOpen"
  >
    <div class="modal-box containerCol vertical space-between">
      <div class="modal-message">
        {{ message }}
      </div>
      <button
        class="normal-btn modal-btn"
        @click="closeModal"
      >
        {{ $t('close') }}
      </button>
    </div>
  </modal>
</template>

<script>
import _ from 'lodash';

export default {
   data:function () {
      return {
         message:'',
         closeFunc:()=>{}
      };
   },
   methods:{
      beforeOpen (e){

         this.$data.message = e.params.message;

         if(_.isFunction(e.params.closeFunc)){
            this.$data.closeFunc = e.params.closeFunc;
         }
      },

      closeModal (){

         this.$data.closeFunc();
         this.$modal.hide('modal');
      }
   }
};
</script>