import { GET_HOME } from '../constant';

const initState = {
    banner: [],
    chill: {},
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_HOME:
            return {
                ...state,
                banner: action.payload.items.find((item) => item.sectionId === 'hSlider').items || null,
                chill: action.payload.items.find((item) => item.sectionId === 'hEditorTheme') || {},
            };
        default:
            return state;
    }
};

export default appReducer;
