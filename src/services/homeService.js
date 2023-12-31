import * as httpRequest from '~/utils/httpRequest';

export const getHome = async () => {
    try {
        const res = await httpRequest.get('home');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
