<template>
  <div class="containerBetween">
    <button
      v-if="isExpand"
      class="menu-cart-closed"
    >
      <img class="menu-cart-closed-btn cursor" />
    </button>

    <div
      class="containerBetween"
      :class="{'container-expand':'isExpand'}"
    >
      <div
        class="cart-left"
        :class="{ 'cart-left-expand':'isExpand' }"
        }
      >
      </div>
      <div
        class="menu-cart-main-container"
        :class="{ 'menu-cart-main-container-expand': 'isExpand' }"
      >
        <div class="menu-cart-items"></div>

        <div>
          <div
            v-if="isExpand"
            class="containerBetween menu-cart-total"
          >
            <div>  </div>
            <div></div>
          </div>

          <button
            class="menu-cart-subtotal-btn"
            :class="{ 'menu-cart-subtotal-btn-expand':'isExpand' }"
          >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* style */
import './style.scss';

/* components */
// import CartItem from './CartItem';

/* utils */
// import { formatPrice,get,set } from '../../../Common/utils';

/* public */
// import { getTotal } from '../public';

export default {

};
</script>