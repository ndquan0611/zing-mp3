import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, SettingIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Search from '~/layouts/components/Search';
import styles from './Header.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Header() {
    const { isShow } = useSelector((state) => state.app);

    return (
        <header className={cx('wrapper', `${isShow && 'right-[330px]'}`)}>
            <div className={cx('inner')}>
                <div className={cx('flex items-center')}>
                    <button className={cx('mr-5')}>
                        <ArrowLeftIcon />
                    </button>
                    <button className={cx('mr-5')}>
                        <ArrowRightIcon />
                    </button>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    <Button leftIcon={<DownloadIcon />} curved outlined className={cx('download-btn')}>
                        Tải bản Windows
                    </Button>
                    <button className={cx('action-btn')}>
                        <SettingIcon />
                    </button>
                    <Image
                        className={cx('user-avatar')}
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.76/static/media/user-default.3ff115bb.png"
                        alt=""
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
