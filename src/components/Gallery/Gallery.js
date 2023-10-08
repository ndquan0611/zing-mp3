import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

import Image from '~/components/Image';
import styles from './Gallery.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';

const cx = classNames.bind(styles);

function Gallery() {
    const { banner } = useSelector((state) => state.app);
    console.log(banner);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

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
