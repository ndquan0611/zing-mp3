import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import config from '~/config';
import { DiscoverIcon, LibraryIcon, PlayOutlineIcon, RadioIcon, ZingChartIcon } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import styles from './SidebarLeft.module.scss';

const cx = classNames.bind(styles);

function SidebarLeft() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('brand')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="ZingMp3" />
                </Link>
            </div>
            <Menu>
                <MenuItem title="Khám Phá" to={config.routes.home} leftIcon={<DiscoverIcon />} />
                <MenuItem
                    title="#zingchart"
                    to={config.routes.zingChart}
                    leftIcon={<ZingChartIcon />}
                    rightIcon={<PlayOutlineIcon />}
                />
                <MenuItem
                    title="Radio"
                    to={config.routes.radio}
                    leftIcon={<RadioIcon />}
                    rightIcon={<PlayOutlineIcon />}
                    image={images.live}
                />
                <MenuItem
                    title="Thư Viện"
                    to={config.routes.mymusic}
                    leftIcon={<LibraryIcon />}
                    rightIcon={<PlayOutlineIcon />}
                />
            </Menu>
        </aside>
    );
}

export default SidebarLeft;
