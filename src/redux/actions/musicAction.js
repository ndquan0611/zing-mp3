import { PLAY, SET_CUR_SONG_ID } from '../constant';

export const setCurSongId = (id) => ({
    type: SET_CUR_SONG_ID,
    payload: id,
});

export const play = (flag) => ({
    type: PLAY,
    payload: flag,
});
