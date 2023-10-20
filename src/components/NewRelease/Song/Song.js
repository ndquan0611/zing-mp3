import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SongItem from './SongItem';
import styles from './Song.module.scss';

const cx = classNames.bind(styles);

function Song({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('song-card')}>
                {data.slice(0, 4).map((item) => (
                    <SongItem key={item.encodeId} data={item} />
                ))}
            </div>
            <div className={cx('song-card')}>
                {data.slice(4, 8).map((item) => (
                    <SongItem key={item.encodeId} data={item} />
                ))}
            </div>
            <div className={cx('song-card')}>
                {data.slice(8, 12).map((item) => (
                    <SongItem key={item.encodeId} data={item} />
                ))}
            </div>
        </div>
    );
}

Song.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Song;
