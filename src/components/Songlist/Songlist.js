import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import SonglistItem from './SonglistItem';
import styles from './Songlist.module.scss';

const cx = classNames.bind(styles);

function Songlist() {
    const { songs } = useSelector((state) => state.music);

    return (
        <Fragment>
            <div className={cx('inner', 'uppercase')}>
                <div className={cx('left')}>
                    <span>Bài hát</span>
                </div>
                <div className={cx('content')}>
                    <span>Album</span>
                </div>
                <div className={cx('right')}>
                    <span>Thời gian</span>
                </div>
            </div>
            <div className={cx('list')}>
                {songs?.map((item) => (
                    <SonglistItem key={item.encodeId} data={item} />
                ))}
            </div>
        </Fragment>
    );
}

Songlist.propTypes = {
    data: PropTypes.array,
    duration: PropTypes.number,
};

export default Songlist;
