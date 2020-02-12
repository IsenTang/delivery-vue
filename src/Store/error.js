import _ from 'lodash';

const error = {

    state:{
        show: false,
        message: '',
        closeFunc: _.noop()
    },
    mutation:{

        /* show error */
        showError(state,payload){
            state.show = true;
            state.message = payload.message;
            state.closeFunc = payload.closeFunc;
        },

        /* hide error */
        hideError(state){
            state.show = false;
        }
    }
}

export default error;