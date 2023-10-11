import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';

const cx = classNames.bind(styles);

function SidebarRight() {
    return (
        <aside className={cx('wrapper', 'hidden')}>
            <h2>SidebarRight page</h2>
        </aside>
    );
}

export default SidebarRight;
