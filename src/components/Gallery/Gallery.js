import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

import { ChevronLeftIcon, ChevronRightIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { getSongs, play, setCurSongId } from '~/redux/actions/musicAction';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

function Gallery() {
    const { banner } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const handleClickBanner = (item) => {
        if (item.type === 1) {
            dispatch(setCurSongId(item.encodeId));
            dispatch(play(true));
            dispatch(getSongs(null));
        } else if (item.type === 4) {
            const path = item.link.split('.')[0];
            navigate(path);
        } else {
            dispatch(getSongs(null));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    speed={600}
                    loop={true}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    className={cx('mySwiper')}
                >
                    {banner.concat(banner).map((item, index) => (
                        <SwiperSlide key={`${item.encodeId}-${index}`} className={cx('gallery-item')}>
                            <Image
                                src={item.banner}
                                alt={item.title}
                                className={cx('w-full h-auto object-cover rounded-lg')}
                                onClick={() => handleClickBanner(item)}
                            />
                        </SwiperSlide>
                    ))}

                    <>
                        <button ref={prevRef} className={cx('prev')}>
                            <ChevronLeftIcon />
                        </button>

                        <button ref={nextRef} className={cx('next')}>
                            <ChevronRightIcon />
                        </button>
                    </>
                </Swiper>
            </div>
        </div>
    );
}

export default Gallery;
