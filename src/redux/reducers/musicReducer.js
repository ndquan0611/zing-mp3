import { GET_SONGS, PLAY, SET_ALBUM, SET_CUR_SONG_ID } from '../constant';

const initState = {
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: [],
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
        case SET_ALBUM:
            return {
                ...state,
                atAlbum: action.payload,
            };
        case GET_SONGS:
            return {
                ...state,
                songs: action.payload || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
