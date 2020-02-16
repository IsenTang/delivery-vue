<template>
  <div class="containerBetween">
    <div class="rest-tab">
      <div class="rest-tab-fixed">
        {{ $t('restaurant.allRestaurant') }}
        <div class="rectangle"></div>
      </div>
    </div>
    <div class="all-rest-box">
      <div>
        <SingleRestaurant
          v-for="(rest) in restaurantList.leftList"
          :key="rest._id"
          :restaurant="rest"
        />
      </div>

      <div class="rest-gap">
        <SingleRestaurant
          v-for="(rest) in restaurantList.rightList"
          :key="rest._id"
          :restaurant="rest"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

/* components */
import SingleRestaurant from './components/Restaurant.vue';

import { mapActions,mapState } from 'vuex';
import _ from 'lodash';

import { checkRestaurantClosed } from './public';

export default {
   components:{
      SingleRestaurant
   },
   computed:{
      ...mapState({
         language: state=>state.language.language,
         restaurants: state=>state.restaurant.restaurants
      }),
      restaurantList (){

         const list =  this.sortRestaurants(this.restaurants);

         const leftList = [];

         const rightList = [];

         _.forEach(list,(item,index)=>{

            if(index % 2 === 0){

               leftList.push(item);
            }else{
               rightList.push(item);
            }
         });

         return {
            leftList,
            rightList
         };
      }
   },

   created (){
      this.loadRestaurants();
   },

   methods:{
      ...mapActions([
         'loadRestaurants'
      ]),

      sortRestaurants (restaurants){
         const openArray = [];
         const closedArray = [];

         let rests = _.cloneDeep(restaurants);

         rests = _.sortBy(restaurants, [ 'featured', true ]);

         rests = _.sortBy(restaurants, 'zscode');

         _.forEach(rests, (item) => {

            if (checkRestaurantClosed(item)) {
               openArray.push(item);
            } else {
               closedArray.push(item);
            }
         });

         /* 开门饭店在前，关门饭店在后 */
         return _.concat(openArray, closedArray);
      }
   }
};
</script>