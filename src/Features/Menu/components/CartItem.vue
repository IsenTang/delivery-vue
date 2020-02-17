<template>
  <div class="containerBetween vertical cart-item">
    <div class="cart-item-name"></div>

    <div class="containerRow">
      <!-- 价格 -->
      <div
        v-if="expand"
        class="cart-item-price"
      ></div>
      {{ price }}

      <!-- 减号 -->
      <button
        v-if="editable"
        class="cart-remove-button"
      >
        -
      </button>

      <!-- 数量 -->
      <div :class="{ 'cart-item-count' :'editable', 'cart-item-count-no-editable':'!editable' }">
        {{ count }}
      </div>

      <!-- 加号 -->
      <button
        v-if="editable"
        className="cart-add-button"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

import { formatPrice } from '../../../Common/utils';

export default {
   props:{
      items:{
         type:Array,
         required:true
      },
      editable:{
         type:Boolean,
         required:false,
         default:true
      },
      expand:{
         type:Boolean,
         required:false,
         default:true
      }
   },
   computed:{

      /* 价格 */
      price (){
         let totalPrice = 0;

         const items = this.$props.items;
         if (items.length > 1) {

            _.forEach(items, (item) => {

               totalPrice += item.totalPrice || item.price;
            });
         } else {

            totalPrice = items[0].totalPrice || items[0].price;
         }

         return `${formatPrice(totalPrice)}`;

      },

      /* 数量 */
      count (){

         return this.$props.items.length;
      }
   }
};
</script>