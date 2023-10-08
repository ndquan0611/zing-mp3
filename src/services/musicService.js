import * as httpRequest from '~/utils/httpRequest';

export const getDetailSong = async (id) => {
    try {
        const res = await httpRequest.get('song', {
            params: { id: id },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
