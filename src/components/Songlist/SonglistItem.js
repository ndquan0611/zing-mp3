import PropTypes from 'prop-types';
import moment from 'moment';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { play, playAlbum, setCurSongId } from '~/redux/actions/musicAction';
import Image from '~/components/Image';
import styles from './Songlist.module.scss';

const cx = classNames.bind(styles);

function SonglistItem({ data = {} }) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    return (
        <div
            className={cx('select-item', `${isActive ? 'active' : ''}`)}
            onClick={() => {
                setIsActive(!isActive);
            }}
            onDoubleClick={() => {
                dispatch(setCurSongId(data.encodeId));
                dispatch(play(true));
                dispatch(playAlbum(true));
            }}
        >
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('thumbnail')}>
                        <Image src={data.thumbnailM} alt={data.title} className={cx('w-full h-auto object-cover')} />
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('text-sm text-white')}>{data.title}</h3>
                        <div className={cx('subtitle')}>
                            {data.artists?.map((artist, index) => (
                                <Fragment key={artist.id}>
                                    <Link to={artist.link}>{artist.name}</Link>
                                    {data.artists?.length > index + 1 && ', '}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <span>{data.album?.title}</span>
                </div>
                <div className={cx('right')}>
                    <span>{moment.utc(data.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
        </div>
    );
}

SonglistItem.propTypes = {
    data: PropTypes.object,
};

export default SonglistItem;
