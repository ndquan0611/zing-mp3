import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import SidebarLeft from '~/layouts/components/SidebarLeft';
import Header from '~/layouts/components/Header';
import SidebarRight from '~/layouts/components/SidebarRight';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SidebarLeft />
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <SidebarRight />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
