import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import styles from './WeekChart.module.scss';

const cx = classNames.bind(styles);

function WeekChart() {
    const { weekChart } = useSelector((state) => state.app);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {weekChart.map((item) => (
                    <div key={item.link} className={cx('weekchart-item')}>
                        <Link to={item.link.split('.')[0]}>
                            <Image src={item.cover} alt="cover" className={cx('w-full h-auto object-cover rounded')} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeekChart;
