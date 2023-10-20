import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Song from './Song';
import styles from './NewRelease.module.scss';

const cx = classNames.bind(styles);

function NewRelease() {
    const { newRelease } = useSelector((state) => state.app);
    const [active, setActive] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (active === 0) {
            setSongs(newRelease.items?.all);
        } else if (active === 1) {
            setSongs(newRelease.items?.others);
        } else if (active === 2) {
            setSongs(newRelease.items?.vPop);
        }
    }, [active, newRelease]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <span>{newRelease.title}</span>
                {!!newRelease.link && (
                    <Link to={newRelease.link.split('.')[0]} className={cx('discovery-btn')}>
                        Tất cả
                    </Link>
                )}
            </h3>
            <div className={cx('mb-4')}>
                <Button
                    curved
                    small
                    className={cx('more-btn', `${active === 0 && 'bg-darkPrimary'}`)}
                    onClick={() => setActive(0)}
                >
                    Tất Cả
                </Button>
                <Button
                    curved
                    small
                    className={cx('more-btn', `${active === 1 && 'bg-darkPrimary'}`)}
                    onClick={() => setActive(1)}
                >
                    Việt Nam
                </Button>
                <Button
                    curved
                    small
                    className={cx('more-btn', `${active === 2 && 'bg-darkPrimary'}`)}
                    onClick={() => setActive(2)}
                >
                    Quốc Tế
                </Button>
            </div>
            <Song data={songs} />
        </div>
    );
}

export default NewRelease;
