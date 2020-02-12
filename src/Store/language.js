import { get } from '../Common/utils';

const language = {

    state:{
        language: get('language') || 'zh'
    },
    mutation:{

        /* 修改语言 */
        changeLanguage(state,payload){
            state.language = payload.language;
        },

    }
}

export default language;