<template>
  <button
    :id="chooseId"
    type="button"
    @click="changeLang(lang.code)"
  >
    {{ lang.show }}
  </button>
</template>

<script>
import { mapActions,mapState } from 'vuex';

export default {
   name:'LanguageButton',
   props:{
      lang:{
         type:Object,
         required:true
      }
   },
   computed:{
      ...mapState({
         language: state=>state.language.language
      }),
      chooseId (state){

         const code = this.$props.lang.code;

         const language = state.language;

         if(code === language){

            return 'on-choose';
         }

         return '';
      }
   },
   methods:{
      ...mapActions([
         'changeLanguage'
      ]),
      changeLang: function (language){

         this.changeLanguage({ language });
      }
   }
};
</script>