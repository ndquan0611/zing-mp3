import { GET_HOME, SHOW } from '../constant';

const initState = {
    banner: [],
    chill: {},
    isShow: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_HOME:
            return {
                ...state,
                banner: action.payload.items.find((item) => item.sectionId === 'hSlider').items || null,
                chill: action.payload.items.find((item) => item.sectionId === 'hEditorTheme') || {},
            };
        case SHOW:
            return {
                ...state,
                isShow: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
