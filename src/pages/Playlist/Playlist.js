import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames/bind';

import * as musicService from '~/services/musicService';
import { handleTimer } from '~/convert/handleTimer';
import Image from '~/components/Image';
import Songlist from '~/components/Songlist';
import styles from './Playlist.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Playlist() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await musicService.getDetailPlaylist(id);
            setPlaylist(result);
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('flex items-start pt-5')}>
                <div className={cx('sticky top-10 w-[300px] float-left')}>
                    <div className={cx('thumbnail')}>
                        <Image
                            src={playlist.thumbnailM}
                            alt={playlist.title}
                            className={cx('w-full h-auto object-cover')}
                        />
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('text-[20px] leading-normal font-bold')}>{playlist.title}</h3>
                        <div className={cx('release')}>
                            <span>Cập nhật: </span>
                            <span>{moment.unix(playlist.contentLastUpdate).format('DD/MM/YYYY')}</span>
                        </div>
                        <div className={cx('artists')}>{playlist.artistsNames}</div>
                        <div className={cx('like')}>
                            <span>{`${Math.round(playlist.like / 1000)}K người yêu thích`}</span>
                        </div>
                        <div className={cx('mt-4')}>
                            <Button small primary curved className={cx('uppercase font-normal hover:brightness-90')}>
                                Tiếp tục phát
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('flex-1 ml-[30px]')}>
                    <div className={cx('description')}>
                        <span className={cx('text-textSecondary')}>Lời tựa </span>
                        <span>{playlist.description}</span>
                    </div>
                    <div className={cx('mb-[10px]')}>
                        <Songlist data={playlist.song?.items} />
                    </div>
                    <div className={cx('total')}>
                        <span className={cx('mr-2')}>{playlist.song?.total} bài hát</span>•
                        <span className={cx('ml-2')}>{handleTimer(playlist.song?.totalDuration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
