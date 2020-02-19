<template>
  <div class="containerBetween">
    <div class="order-tab">
      <div class="order-tab-fixed">
        {{ $t('order.title') }}
        <div class="rectangle"></div>
      </div>
    </div>

    <div class="order-list">
      <div v-if="orders.length === 0">
        no orders
      </div>
      <SingleOrder
        v-for="order in orders"
        :key="order._id"
        :order="order"
      />
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

/* components */
import SingleOrder from './components/SingleOrder';

import { mapActions,mapState } from 'vuex';
import _ from 'lodash';
import { get } from '../../Common/utils';

export default {
   components:{
      SingleOrder
   },
   computed:{

      ...mapState({
         language: state=>state.language.language,
         orders:state=>state.order.orders
      }),
   },
   mounted (){

      const token = _.get(get('user'),'token','');

      /* 如果没登录，返回到restaurant页面 */
      if(_.isEmpty(token)){
         this.$router.push('/restaurant');
      }else{
         /* 获取restaurants */
         this.loadOrders();
      }
   },
   methods:{

      ...mapActions([
         'loadOrders'
      ]),
   }
};
</script>