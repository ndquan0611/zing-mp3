import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
import CarouselItem from './CarouselItem';

const cx = classNames.bind(styles);

function Carousel({ data = [], hideTitle }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {data.slice(0, 5).map((item) => {
                    return <CarouselItem key={item.encodeId} data={item} hideTitle={hideTitle} />;
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
