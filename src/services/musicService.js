import * as httpRequest from '~/utils/httpRequest';

export const getSong = async (id) => {
    try {
        const res = await httpRequest.getDetail('song', {
            params: {
                id: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getInfoSong = async (id) => {
    try {
        const res = await httpRequest.getDetail('infosong', {
            params: {
                id: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailPlaylist = async (id) => {
    try {
        const res = await httpRequest.getDetail('detailplaylist', {
            params: {
                id: id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
