<template>
  <div
    ref="order-item"
    class="order-item-box"
    :class="{'order-item-box-expand': expand }"
  >
    <!-- title -->
    <div class="order-title">
      <!-- 餐馆名 -->
      <div class="titleText order-item-name">
        {{ name }}
      </div>
      <!-- 日期 -->
      <div
        class="containerRowCenter subTitleText"
        :style="{ width :'auto' }"
      >
        {{ time }}
      </div>
    </div>

    <div class="order-items">
      <CartItem
        v-for="item in orderItems"
        :key="item.key"
        :items="item"
        :editable="false"
        :expand="expand"
      />
    </div>

    <!-- footer -->
    <div class="order-footer">
      <div
        v-if="expand"
        class="containerRowCenter"
      >
        <img
          alt=""
          src="@/Assets/logo.png"
        />
      </div>
      <!-- 总价 -->
      <div class="containerBetween order-total">
        <div> {{ $t('menu.total') }} </div>
        <div> {{ price }}</div>
      </div>
      <!-- more -->
      <div class="containerRowCenter more-btn">
        <button
          class="normal-btn"
          @click="handleMore"
        >
          {{ $t('order.more') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* styles */
import './style.scss';

/* componets */
import CartItem from '../../Menu/components/CartItem';

import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { mapState } from 'vuex';
import Moment from 'moment';
import { getLanguageInfo , formatPrice } from '../../../Common/utils';
import { getTotal } from '../../Menu/public';

export default {
   components:{
      CartItem
   },
   props:{
      order:{
         type:Object,
         required:true
      }
   },
   data:function () {
      return {
         expand:false
      };
   },
   computed:{

      ...mapState({
         language: state=>state.language.language
      }),

      name (){
         return getLanguageInfo(this.order,'restaurant.name',this.language);
      },

      time (){
         return Moment(this.order.createdAt).format('YYYY-MM-DD HH:mm');
      },

      price (){
         return formatPrice(getTotal(_.get(this.order,'cart')));
      },
      orderItems (){

         const cart = _.get(this.$props.order,'cart');

         const orderItems = _(cart)
            .groupBy(i => i._id)
            .map(item =>{

               item.key = uuidv4();
               return item;
            }).value();

         return orderItems;
      }
   },
   destroyed (){

      /* 移除listener */
      document.removeEventListener('mousedown', this.handleClickOutside,true);
   },
   methods:{

      handleMore (e){

         e.preventDefault();

         this.$data.expand = true;

         /* 增加 mouse down 监听，点击组件外，关闭组件 */
         document.addEventListener('mousedown', this.handleClickOutside,true);
      },

      handleClickOutside (e){

         const ref = this.$refs['order-item'];
         if (ref &&
         !ref.contains(e.target)) {
            this.$data.expand = false;
            document.removeEventListener('mousedown', this.handleClickOutside,true);
         }
      }
   },
};
</script>