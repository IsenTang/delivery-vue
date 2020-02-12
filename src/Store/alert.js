import _ from 'lodash';

const alert = {

    state:{
        show: false,
        message:'',
        closeFunc: _.noop()
    },
    mutation:{

        /* show loading */
        showAlert(state,payload){
            state.show = true;
            state.message = payload.message,
            state.closeFunc = payload.closeFunc || _.noop()
        },

        /* hide loading */
        hideAlert(state){
            state.show = false;
        }
    }
}

export default alert;