import { GET_HOME } from '../constant';

const initState = {
    banner: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_HOME:
            return {
                ...state,
                banner: action.payload.items.find((item) => item.sectionType === 'banner').items || null,
            };
        default:
            return state;
    }
};

export default appReducer;
