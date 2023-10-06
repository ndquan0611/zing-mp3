import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';

const cx = classNames.bind(styles);

function SidebarLeft() {
    return (
        <aside className={cx('wrapper')}>
            <h2>SidebarLeft page</h2>
        </aside>
    );
}

export default SidebarLeft;
