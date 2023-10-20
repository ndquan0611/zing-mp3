import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Carousel from '~/components/Carousel';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function Playlist({ data = {} }) {
    return (
        <Fragment>
            {data.items?.length >= 5 && (
                <div className={cx('wrapper')}>
                    <h3 className={cx('title')}>
                        <span>{data.title}</span>
                        {!!data.link && (
                            <Link to={data.link.split('.')[0]} className={cx('discovery-btn')}>
                                Tất cả
                            </Link>
                        )}
                    </h3>
                    <Carousel data={data.items} hideTitle={data.options?.hideTitle} />
                </div>
            )}
        </Fragment>
    );
}

Playlist.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Playlist;
