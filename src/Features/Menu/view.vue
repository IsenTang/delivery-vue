<template>
  <div class="menu-box">
    <div class="titleText">
    </div>
    <div class="subTitleText">
    </div>

    <div class="all-category-box">
      <CategoryItem
        v-for="item in menuList"
        :key="item.key"
        :foods="item.foods"
        :category="item.category"
      />
    </div>
    <div class="menu-cart-container">
      <div class="menu-cart-content">
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

import { mapActions,mapState } from 'vuex';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

import CategoryItem from './components/CategoryItem.vue';

export default {

   components:{
      CategoryItem
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

   created (){
      this.loadMenu({ restaurantId:this.$props.restId });
   },

   methods:{
      ...mapActions([
         'loadMenu'
      ]),
   }
};
</script>