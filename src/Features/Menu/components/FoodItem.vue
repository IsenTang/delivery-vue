<template>
  <div
    class="menu-food-item cursor"
    @click="addFood"
  >
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
        :class="{ 'no-available':!available }"
      >
        {{ name }}
      </div>

      <!-- food price -->
      <div
        class="menu-price cursor"
        ::class="{ 'no-available':!available }"
      >
        {{ price }}
      </div>
    </div>
  </div>
</template>>

<script>
/* style */
import './style.scss';

import { mapActions,mapState } from 'vuex';
import _ from 'lodash';
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

         /* 在cart中寻找对应的food */
         const index = _.findIndex(this.cart, { _id: this.food._id });

         /* food 的数量 */
         let length = 0;

         /* 如果cart中有food */
         if (index !== -1) {

            const afterGroupCart = _.groupBy(this.cart, '_id');

            /* 获取group之后的数量 */
            _.forEach(afterGroupCart, (item, i) => {

               if (i === this.food._id) {
                  length = item.length;
               }
            });
         }

         return length;
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
         'addCart'
      ]),

      addFood (){

         /* 如果食物不可以点 */
         if(!this.$props.food.available){
            return;
         }

         this.addCart({ food: this.$props.food,cartId:this.$route.params.restId });
      }
   }
};
</script>