<template>
  <div class="containerBetween">
    <button
      v-if="isExpand"
      class="menu-cart-closed"
    >
      <img
        class="menu-cart-closed-btn cursor"
        src="@/Assets/close_btn.png"
        @click="expand"
      />
    </button>

    <div
      class="containerBetween"
      :class="{'container-expand':isExpand}"
    >
      <div
        class="cart-left"
        :class="{ 'cart-left-expand':isExpand }"
      >
        <div class="containerCol">
          <div
            class="containerRowCenter"
            :class="{'not-visible': !isExpand,'visible': isExpand }"
          >
            <img src="@/Assets/logo.png" />
          </div>

          <div
            class="containerRowAlign horizontally"
            :class="{ 'not-visible': !isExpand,'visible': isExpand }"
          >
            <div class="menu-cart-payment-input">
              <v-select
                label="value"
                :value="payment"
                :options="payments"
                @input="setPayment($event)"
              >
                <template
                  slot="selected-option"
                  slot-scope="option"
                >
                  <img
                    :src="option.img"
                    class="payment-select-logo"
                  />
                </template>

                <template
                  slot="option"
                  slot-scope="option"
                >
                  <img
                    :src="option.img"
                    class="payment-select-logo"
                  />
                </template>
              </v-select>
            </div>
          </div>
        </div>
      </div>
      <div
        class="menu-cart-main-container"
        :class="{ 'menu-cart-main-container-expand': isExpand }"
      >
        <div>
          <!-- 购物车空 -->
          <div
            v-if="cartItems.length === 0"
            class="cart-empty-text"
          >
            {{ $t('menu.cartTitle') }}
          </div>

          <!-- 购物车items -->
          <div v-if="cartItems.length > 0">
            <CartItem
              v-for=" item in cartItems"
              :key="item._id"
              :items="item"
            />
          </div>
        </div>
        <div>
          <div
            v-if="isExpand"
            class="containerBetween menu-cart-total"
          >
            <div> {{ $t('menu.total') }} </div>
            <div> {{ price }} </div>
          </div>

          <button
            class="menu-cart-subtotal-btn"
            :class="{ 'menu-cart-subtotal-btn-expand':isExpand }"
            @click="placeOrder()"
          >
            {{ $t('menu.place-order') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import 'vue-select/dist/vue-select.css';
import './style.scss';

import { mapState,mapActions } from 'vuex';
import _ from 'lodash';

/* components */
import CartItem from './CartItem';

/* utils */
import { formatPrice,get,set } from '../../../Common/utils';

/* public */
import { getTotal } from '../public';

export default {
   components:{
      CartItem
   },
   data:function () {
      return {
         isExpand:false,
         payments : [
            { value: 'alipay',img:require('../../../Assets/alipay.png') },
            { value: 'wechat',img:require('../../../Assets/wechatpay.png') },
            { value: 'applePay',img:require('../../../Assets/applepay_small.png') }
         ],
         payment:get('payment') || null,
      };
   },
   computed:{
      ...mapState({
         language: state=>state.language.language,
         cart:state=>state.cart.cart
      }),

      cartItems (){

         if(_.isEmpty(this.cart)){

            return [];
         }

         let cloneCart = _.cloneDeep(this.cart);
         /* 根据id，获取购物车物品数量 */
         cloneCart = _.groupBy(this.cart, (item) => item._id);

         return _.toArray(cloneCart);
      },

      price (){

         return formatPrice(getTotal(this.cart));
      }
   },
   methods:{

      ...mapActions([
         'checkout'
      ]),

      expand (){

         this.$data.isExpand = !this.$data.isExpand;
      },

      placeOrder (){

         if(!this.$data.isExpand){
            this.$data.isExpand = true;
         }else{
            this.checkout();
         }

      },

      setPayment (e){

         if(_.isNull(e)){
            set('payment',{});
            this.$data.payment = {};
         }else{
            set('payment',e);
            this.$data.payment = e;
         }
      }
   }
};
</script>

<style scoped>

.style-chooser .vs__dropdown-menu {
    background: #e8e8e8;
}
</style>