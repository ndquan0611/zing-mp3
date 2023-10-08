import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import * as musicService from '~/services/musicService';
import styles from './Player.module.scss';

const cx = classNames.bind(styles);

function Player() {
    const { curSongId } = useSelector((state) => state.music);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await musicService.getDetailSong(curSongId);
            console.log(res);
        };
        fetchApi();
    }, [curSongId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>Detail</div>
                <div>Main</div>
                <div>Volumn</div>
            </div>
        </div>
    );
}

export default Player;
