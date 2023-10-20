import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

function Carousel({ data = [], hideTitle }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {data.slice(0, 5).map((item) => {
                    return (
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
                                {hideTitle ? (
                                    <h4 className={cx('subtitle')}>{item.sortDescription}</h4>
                                ) : (
                                    <Fragment>
                                        <h3 className={cx('title')}>
                                            <Link to={item.link.split('.')[0]}>{item.title}</Link>
                                        </h3>
                                        <h4 className={cx('subtitle')}>
                                            {item.artists?.map((artist, index) => (
                                                <Fragment key={artist.id}>
                                                    <Link to={artist.link}>{artist.name}</Link>
                                                    {item.artists?.length > index + 1 && ', '}
                                                </Fragment>
                                            ))}
                                        </h4>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Carousel.propTypes = {
    data: PropTypes.array,
    hideTitle: PropTypes.bool,
};

export default Carousel;
