import { get } from '../Common/utils';

const cart = {

    state:{
        cart: get('cart') || []
    },
    mutation:{

        /* save cart */
        saveCart(state,payload){
            state.cart = payload.cart;
        },

        /* clear cart */
        clearCart(state){
            state.cart = [];
        }
    }
}

export default cart;