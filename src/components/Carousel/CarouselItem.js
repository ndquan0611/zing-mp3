import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { icons } from '~/components/Icons';
import Image from '~/components/Image';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);
const { BsFillPlayFill } = icons;

function CarouselItem({ data = {}, hideTitle }) {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className={cx('carousel-item')}
            onClick={() => navigate(data.link.split('.')[0], { state: { playAlbum: false } })}
        >
            <div
                className={cx('thumbnail')}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover && (
                    <div
                        className={cx(
                            'absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 z-20 flex items-center justify-center',
                        )}
                    >
                        <button
                            className={cx('p-2 border-white border-solid border rounded-full')}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(data.link.split('.')[0], { state: { playAlbum: true } });
                            }}
                        >
                            <BsFillPlayFill size={30} />
                        </button>
                    </div>
                )}
                <Image src={data.thumbnailM} alt={data.title} className={cx('w-full h-auto object-cover')} />
            </div>
            <div className={cx('info')}>
                {hideTitle ? (
                    <h4 className={cx('subtitle')}>{data.sortDescription}</h4>
                ) : (
                    <Fragment>
                        <h3 className={cx('title')}>
                            <Link to={data.link.split('.')[0]}>{data.title}</Link>
                        </h3>
                        <h4 className={cx('subtitle')}>
                            {data.artists?.map((artist, index) => (
                                <Fragment key={artist.id}>
                                    <Link to={artist.link}>{artist.name}</Link>
                                    {data.artists?.length > index + 1 && ', '}
                                </Fragment>
                            ))}
                        </h4>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

CarouselItem.propTypes = {
    data: PropTypes.object.isRequired,
    hideTitle: PropTypes.bool,
};

export default CarouselItem;
