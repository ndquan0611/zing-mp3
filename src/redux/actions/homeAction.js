import * as homeService from '~/services/homeService';
import { GET_HOME } from '../constant';

export const getHome = () => async (dispatch) => {
    const res = await homeService.getHome();
    dispatch({
        type: GET_HOME,
        payload: res,
    });
};
