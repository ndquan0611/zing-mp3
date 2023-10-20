import * as homeService from '~/services/homeService';
import { GET_HOME, LOADING, SHOW } from '../constant';

export const getHome = () => async (dispatch) => {
    const res = await homeService.getHome();
    dispatch({
        type: GET_HOME,
        payload: res,
    });
};

export const show = (flag) => ({
    type: SHOW,
    payload: flag,
});

export const loading = (flag) => ({
    type: LOADING,
    payload: flag,
});
