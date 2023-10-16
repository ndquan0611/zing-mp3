import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from '~/components/Carousel';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function Playlist() {
    const { chill } = useSelector((state) => state.app);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <span>{chill.title}</span>
                {!!chill.link && (
                    <Link to={chill.link.split('.')[0]} className={cx('discovery-btn')}>
                        Tất cả
                    </Link>
                )}
            </h3>
            <Carousel data={chill.items} />
        </div>
    );
}

export default Playlist;
