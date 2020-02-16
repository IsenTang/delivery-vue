<template>
  <div class="rest-image-box">
    <img
      src="@/Assets/dark-dish.png"
      class="dish-image"
      :style="styleObj"
    />
    <img
      class="food-image"
      :style="styleObj"
      :src="image"
    />
  </div>
</template>

<script>
import './style.scss';
export default {
   props:{
      image:{
         type: String,
         required:true
      },
      width:{
         type:[ Number,String ],
         required:true
      },
      height:{
         type:[ Number,String ],
         required:false,
         default:'auto'
      },
   },
   data:function () {
      return {
         styleObj:{
            width:this.$props.width,
            height:this.$props.height
         }
      };
   }
};
</script>