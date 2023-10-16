import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

function Carousel({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {data.map((item) => (
                    <div key={item.encodeId} className={cx('carousel-item')}>
                        <div className={cx('thumbnail')}>
                            <Link to={item.link.split('.')[0]}>
                                <Image
                                    src={item.thumbnailM}
                                    alt={item.title}
                                    className={cx('w-full h-auto object-cover')}
                                />
                            </Link>
                        </div>
                        <div className={cx('info')}>
                            <h4 className={cx('subtitle')}>{item.sortDescription}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Carousel.propTypes = {
    data: PropTypes.array,
};

export default Carousel;
