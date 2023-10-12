import { PLAY, SET_CUR_SONG_ID } from '../constant';

const initState = {
    curSongId: null,
    isPlaying: false,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.payload || null,
            };
        case PLAY:
            return {
                ...state,
                isPlaying: action.payload,
            };
        default:
            return state;
    }
};

export default musicReducer;
