
<template>
  <div
    v-if="show"
    class="loading-container"
  >
    <div class="loading-opacityContainer" />
    <div class="loading-image-container">
      <img
        src="@/Assets/loading.gif"
        class="loading-image"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import './style.scss';

export default {
   computed:{

      ...mapState({
         show: state=>state.loading.show
      })
   },
   methods:{

      removeTransition (event) {
         if (event.propertyName !== 'transform') return; // 过滤其中一种事件
         event.target.classList.remove('playing'); // 移除高亮的样式
      },
      playSound (event) {
         const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`); // 根据触发按键的键码，获取对应音频
         const key = document.querySelector(`div[data-key="${event.keyCode}"]`); // 获取页面对应按钮 DIV 元素
         if (!audio) return; // 处理无效的按键事件

         key.classList.add('playing'); // 改变样式
         audio.currentTime = 0; // 每次播放之后都使音频播放进度归零
         audio.play(); // 播放相应音效
      }
   }
};
</script>