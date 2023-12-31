import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { getHome } from '~/redux/actions/homeAction';
import { Loading } from '~/components/Loading';
import SidebarLeft from '~/layouts/components/SidebarLeft';
import Header from '~/layouts/components/Header';
import SidebarRight from '~/layouts/components/SidebarRight';
import Player from '~/layouts/components/Player';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { isShow, isLoading } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHome());
    }, []);

    return (
        <div className={cx('wrapper')}>
            <SidebarLeft />
            <Header />
            <div className={cx('container')}>
                {isLoading && (
                    <div
                        className={cx(
                            'absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-[#170f23]',
                        )}
                    >
                        <Loading />
                    </div>
                )}
                <div className={cx('content')}>{children}</div>
            </div>
            {isShow && <SidebarRight />}
            <Player />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
