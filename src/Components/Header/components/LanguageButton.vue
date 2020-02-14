<template>
  <button
    :id="chooseId"
    type="button"
    @click="changeLanguage(lang.code)"
  >
    {{ lang.show }}
  </button>
</template>

<script>
import { mapActions,mapState } from 'vuex';

export default {
   name:'LanguageButton',
   props:[ 'lang' ],
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
         'language/changeLanguage'
      ]),
      changeLanguage: function (language){

         this['language/changeLanguage']({ language });
      }
   }
};
</script>