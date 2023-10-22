import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { play, setCurSongId } from '~/redux/actions/musicAction';
import Image from '~/components/Image';
import styles from './Song.module.scss';

const cx = classNames.bind(styles);

function SongItem({ data = {} }) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    return (
        <div
            className={cx('song-item', `${isActive && 'bg-borderPrimary'}`)}
            onDoubleClick={() => {
                setIsActive((prev) => !prev);
                dispatch(setCurSongId(data.encodeId));
                dispatch(play(true));
            }}
        >
            <div className={cx('thumbnail')}>
                <Image src={data.thumbnailM} alt={data.title} />
            </div>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{data.title}</h3>
                <h4 className={cx('subtitle')}>
                    {data.artists?.map((artist, index) => (
                        <Fragment key={artist.id}>
                            <Link to={artist.link}>{artist.name}</Link>
                            {data.artists?.length > index + 1 && ', '}
                        </Fragment>
                    ))}
                </h4>
                <div className={cx('time-release')}>{moment(data.releaseDate * 1000).fromNow()}</div>
            </div>
        </div>
    );
}

SongItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SongItem;
