<template>
  <div class="containerBetween vertical cart-item">
    <div class="cart-item-name">
      {{ name }}
    </div>

    <div class="containerRow">
      <!-- 价格 -->
      <div
        v-if="expand"
        class="cart-item-price"
      >
        {{ price }}
      </div>

      <!-- 减号 -->
      <button
        v-if="editable"
        class="cart-remove-button"
        @click="removeFood"
      >
        -
      </button>

      <!-- 数量 -->
      <div :class="{ 'cart-item-count' :'editable', 'cart-item-count-no-editable':!editable }">
        {{ count }}
      </div>

      <!-- 加号 -->
      <button
        v-if="editable"
        class="cart-add-button"
        @click="addFood"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

import _ from 'lodash';
import { mapActions,mapState } from 'vuex';
import { formatPrice,getLanguageInfo } from '../../../Common/utils';

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
      ...mapState({
         language: state=>state.language.language
      }),

      /* 名字 */
      name (){

         return getLanguageInfo(this.items[0],'name',this.language);
      },
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
   },
   methods:{
      ...mapActions([
         'addCart',
         'removeCart'
      ]),

      addFood (){

         this.addCart({ food: this.$props.items[0] });
      },

      removeFood (){

         this.removeCart({ food: this.$props.items[0] });
      }
   }
};
</script>