import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, leftIcon, rightIcon, image }) {
    return (
        <NavLink
            className={(nav) =>
                cx('menu-item', {
                    active: nav.isActive,
                })
            }
            to={to}
        >
            <span className={cx('left-icon')}>{leftIcon}</span>
            <span className={cx('title')}>{title}</span>
            {!!image && <img src={image} alt="Live" className={cx('ml-2')} />}
            <span className={cx('right-icon')}>{rightIcon}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    image: PropTypes.string,
};

export default MenuItem;
