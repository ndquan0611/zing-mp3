// import * as musicService from '~/services/musicService';
import { GET_SONGS, PLAY, SET_ALBUM, SET_CUR_SONG_ID } from '../constant';

export const setCurSongId = (id) => ({
    type: SET_CUR_SONG_ID,
    payload: id,
});

export const play = (flag) => ({
    type: PLAY,
    payload: flag,
});

export const playAlbum = (flag) => ({
    type: SET_ALBUM,
    payload: flag,
});

export const getSongs = (songs) => ({
    type: GET_SONGS,
    payload: songs,
});

// export const fetchDetailPlaylist = (id) => async (dispatch) => {
//     const res = await musicService.getDetailPlaylist(id);
//     console.log(res);
//     dispatch({
//         type: GET_SONGS,
//         payload: res,
//     });
// };
