<template>
  <div
    class="rest-box"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <div class="titleText">
      {{ restaurantName }}
    </div>
    <div class="subTitleText">
      {{ restaurantTags }}
    </div>
    <div>
      <div class="img-box">
        <div class="img-box-1">
          <div
            v-if="showName"
            class="rest-food-name"
          >
            {{ image1Name }}
          </div>
          <DishFood
            :image="image1"
            width="100%"
          />
        </div>
        <div
          :id="image2Id"
          class="img-box-2"
          :class="{ 'img-box-2-go-left': showName}"
        >
          <div
            v-if="showName"
            class="rest-food-name"
          >
            {{ image2Name }}
          </div>
          <DishFood
            :image="image2"
            width="100%"
          />
        </div>
        <div class="img-box-3">
          <div
            v-if="showName"
            class="rest-food-name"
          >
            {{ image3Name }}
          </div>
          <DishFood
            :image="image3"
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

/* component */
import DishFood from './DishFood.vue';

import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import { mapActions,mapState } from 'vuex';
import { getLanguageInfo } from '../../../Common/utils';
import { renderTags } from '../public';

export default {
   components:{ DishFood },
   props:{
      restaurant: {
         type:Object,
         required:true
      }
   },
   data:function () {
      return {
         defaultItems:[
            {
               name: {
                  'zh-CN': '红烧狮子头',
                  'en-US': 'Stewed Lion Head Chinese Meatballs'
               },
               image: 'https://s3.amazonaws.com/ricepo-food/image-3r7hnd04jyk7nbn3.png'
            },
            {
               name:  {
                  'zh-CN': '三杯鸡',
                  'en-US': 'Three Cups Chicken'
               },
               image: 'https://s3.amazonaws.com/ricepo-food/image-5b7jxyy2jvu95frk.png'
            },
            {
               name: {
                  'zh-CN': '番茄鸡蛋面',
                  'en-US': 'Tomato Egg Noodle'
               },
               image:     'https://s3.amazonaws.com/ricepo-food/image-o1bt3qsjz0fhei4.png'
            }
         ],
         uuid:uuidv4(),
         showName: false
      };
   },
   computed:{
      ...mapState({
         language: state=>state.language.language
      }),
      restaurantName (){

         return getLanguageInfo(this.$props.restaurant,'name',this.language);
      },
      restaurantTags (){

         return renderTags(this.$props.restaurant);
      },
      image1Name (){

         const language = this.language;
         return _.get(this.$props.restaurant, `items[0].name[${language}]`, this.$data.defaultItems[0].name[`${language}`]);
      },
      image1 (){
         return _.get(this.$props.restaurant, 'items[0].image.url', this.$data.defaultItems[0].image);
      },
      image2Name (){

         const language = this.language;
         return _.get(this.$props.restaurant, `items[1].name[${language}]`, this.$data.defaultItems[1].name[`${language}`]);
      },
      image2 (){
         return _.get(this.$props.restaurant, 'items[1].image.url', this.$data.defaultItems[1].image);
      },
      image2Id (){

         return `img-box-2-${this.$data.uuid}`;
      },
      image3Name (){

         const language = this.language;
         return _.get(this.$props.restaurant, `items[2].name[${language}]`, this.$data.defaultItems[2].name[`${language}`]);
      },
      image3 (){
         return _.get(this.$props.restaurant, 'items[2].image.url', this.$data.defaultItems[2].image);
      },
   },
   methods:{
      ...mapActions([
         'goMenu'
      ]),
      onMouseEnter (){
         this.$data.showName = true;
      },

      onMouseLeave (){
         this.$data.showName = false;
      },

      onClick (){
         this.goMenu({ restaurant: this.$props.restaurant });
      }
   }
};
</script>