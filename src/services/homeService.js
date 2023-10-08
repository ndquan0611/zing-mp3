import * as httpRequest from '~/utils/httpRequest';

export const get = async () => {
    try {
        const res = await httpRequest.get('home');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
