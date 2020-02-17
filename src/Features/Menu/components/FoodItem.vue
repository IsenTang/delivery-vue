<template>
  <div class="menu-food-item cursor">
    <!-- food count -->
    <div
      v-if="count !== 0"
      class="menu-count"
    >
      <div class="menu-count-text">
        {{ count }}
      </div>
    </div>

    <div class="containerBetween cursor">
      <!-- food name -->
      <div
        class="menu-text cursor"
        :class="{ 'no-available':'!available' }"
      >
        {{ name }}
      </div>

      <!-- food price -->
      <div
        class="menu-price cursor"
        :class="{ 'no-available':'!available' }"
      >
        {{ price }}
      </div>
    </div>
  </div>
</template>>

<script>
import { mapActions,mapState } from 'vuex';
import { formatPrice } from '../../../Common/utils';

export default {
   name:'FoodItem',
   props:{
      food:{
         type:Object,
         required:true
      }
   },
   computed:{
      ...mapState({
         language: state=>state.language.language,
         cart:state=>state.cart.cart
      }),

      count (){

         return this.$props.food.count || 0;
      },

      name (){

         return this.$props.food.name[`${this.language}`];
      },

      price (){

         return formatPrice(this.$props.food.price);
      },

      available (){

         return this.$props.food.available;
      }
   },
   methods:{
      ...mapActions([

      ]),
   }
};
</script>