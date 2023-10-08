import { SET_CUR_SONG_ID } from '../constant';

const initState = {
    curSongId: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.payload || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
