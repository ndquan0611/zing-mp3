import { GET_HOME, HOVER, LOADING, SHOW } from '../constant';

const initState = {
    banner: [],
    chill: {},
    loveLife: {},
    remix: {},
    status: {},
    popular: {},
    top100: {},
    album: {},
    newRelease: {},
    weekChart: [],
    chart: {},
    rank: [],
    isShow: false,
    isHover: false,
    isLoading: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_HOME:
            return {
                ...state,
                banner: action.payload.items.find((item) => item.sectionId === 'hSlider').items || null,
                chill: action.payload.items.find((item) => item.sectionId === 'hEditorTheme') || {},
                loveLife: action.payload.items.find((item) => item.sectionId === 'hEditorTheme2') || {},
                remix: action.payload.items.find((item) => item.sectionId === 'hEditorTheme3') || {},
                status: action.payload.items.find((item) => item.sectionId === 'hEditorTheme4') || {},
                popular: action.payload.items.find((item) => item.sectionId === 'hArtistTheme') || {},
                top100: action.payload.items.find((item) => item.sectionId === 'h100') || {},
                album: action.payload.items.find((item) => item.sectionId === 'hAlbum') || {},
                newRelease: action.payload.items.find((item) => item.sectionType === 'new-release') || {},
                weekChart: action.payload.items.find((item) => item.sectionType === 'weekChart').items || [],
                chart: action.payload.items.find((item) => item.sectionId === 'hZC').chart || {},
                rank: action.payload.items.find((item) => item.sectionId === 'hZC').items || [],
            };
        case SHOW:
            return {
                ...state,
                isShow: action.payload,
            };
        case HOVER:
            return {
                ...state,
                isHover: action.payload,
            };
        case LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
