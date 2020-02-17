<template>
  <div class="category-box">
    <div>
      <div class="titleText">
        {{ name }}
      </div>
      <div
        class="rectangle"
        :style="{position : 'relative', left : 0}"
      />
    </div>

    <div>
      <FoodItem
        v-for="food in foods"
        :key="food._id"
        :food="food"
      />
      <div class="cateBoxBottom" />
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import FoodItem from './FoodItem.vue';

export default {
   components:{
      FoodItem
   },

   props:{
      foods:{
         type:Array,
         required:true
      },
      category:{
         type:Object,
         required:true
      }
   },

   computed:{

      ...mapState({
         language: state=>state.language.language
      }),

      name (){

         return this.$props.category.name[`${this.language}`];
      }

   },

   methods:{

   }
};
</script>