import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Menu.module.scss';

function Menu({ className, children }) {
    return <nav className={classNames(styles.wrapper, className)}>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
