import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import config from '~/config';
import {
    ChartIcon,
    DiscoverIcon,
    HubIcon,
    LibraryIcon,
    PlayOutlineIcon,
    RadioIcon,
    StarIcon,
    ZingChartIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
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
                <MenuItem title="Thư Viện" to={config.routes.mymusic} leftIcon={<LibraryIcon />} />
            </Menu>

            <div className={cx('separate')}></div>

            <div className={cx('mt-4')}>
                <Menu>
                    <MenuItem
                        title="BXH Nhạc Mới"
                        to={config.routes.rating}
                        leftIcon={<ChartIcon />}
                        rightIcon={<PlayOutlineIcon />}
                    />
                    <MenuItem title="Chủ Đề & Thể Loại" to={config.routes.hub} leftIcon={<HubIcon />} />
                    <MenuItem title="Top 100" to={config.routes.top100} leftIcon={<StarIcon />} />
                </Menu>
                <div className={cx('login')}>
                    <p className={cx('text-[12px] font-semibold mb-[10px]')}>
                        Đăng nhập để khám phá playlist dành riêng cho bạn
                    </p>
                    <Button curved small className={cx('login-btn')}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </aside>
    );
}

export default SidebarLeft;
