const loading = {

    state:{
        show: false
    },
    mutation:{

        /* show loading */
        showLoading(state){
            state.show = true;
        },

        /* hide loading */
        hideLoading(state){
            state.show = false;
        }
    }
}

export default loading;