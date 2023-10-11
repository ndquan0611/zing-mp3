import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import * as musicService from '~/services/musicService';
import styles from './Player.module.scss';

const cx = classNames.bind(styles);

function Player() {
    const { curSongId } = useSelector((state) => state.music);
    const [infoSong, setInfoSong] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await musicService.getInfoSong(curSongId);
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
