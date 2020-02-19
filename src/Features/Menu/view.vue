<template>
  <div class="menu-box">
    <div class="titleText">
      {{ name }}
    </div>
    <div class="subTitleText">
      {{ tags }}
    </div>

    <div class="all-category-box">
      <div v-if="menuList.length === 0 ">
        {{ $t('menu.no-menu') }}
      </div>
      <CategoryItem
        v-for="item in menuList"
        :key="item.key"
        :foods="item.foods"
        :category="item.category"
      />
    </div>
    <div class="menu-cart-container">
      <div class="menu-cart-content">
        <Cart />
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

/* components */
import CategoryItem from './components/CategoryItem.vue';
import Cart from './components/Cart';

import { mapActions,mapState } from 'vuex';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import { getLanguageInfo,get,set } from '../../Common/utils';

import { renderTags } from '../Restaurant/public';

import * as types from '../../Store/mutation-types';

export default {

   components:{
      CategoryItem,
      Cart
   },

   props:{
      restId:{
         type:String,
         required:true
      }
   },

   computed:{
      ...mapState({
         language: state=>state.language.language,
         menu:state=>state.menu
      }),

      /* 饭店名 */
      name (){
         const restaurant = get('restaurant');

         return getLanguageInfo(restaurant,'name',this.language);
      },

      tags (){

         return renderTags(get('restaurant'));
      },
      /* 菜单渲染 */
      menuList (){

         const menu = this.menu;

         const categories = _.get(menu, 'categories');

         const foods = _.get(menu, 'foods');

         if(_.isEmpty(foods)){

            return [];
         }

         const meunArray = [];
         _.forEach(categories, (category) => {

            const categorieId = _.get(category, '_id');

            /* get categorie food by categorie id */
            let categorieFood = _.filter(foods, { category: { _id: categorieId } });

            categorieFood = _.sortBy(categorieFood, 'zscode');

            /* if empty return null */
            if (!_.isEmpty(categorieFood)) {
               meunArray.push(
                  {
                     category,
                     foods:categorieFood,
                     key:uuidv4()
                  });
            }

         });

         return meunArray;
      }
   },

   mounted (){

      /* 进入新餐馆，删除购物车 */
      const cartId = get('cartId');

      if(cartId !== this.$props.restId){

         set('cart',[]);

         this.$store.commit(types.CLEAR_CART);
      }
      this.loadMenu({ restaurantId:this.$props.restId });
   },

   methods:{
      ...mapActions([
         'loadMenu'
      ]),
   }
};
</script>