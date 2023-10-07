import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { ClearIcon, SearchIcon, TrendIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const MENU_SEARCH = [
    {
        icon: <TrendIcon />,
        title: 'chài điếp noọng',
    },
    {
        icon: <TrendIcon />,
        title: 'cắt đôi nỗi sầu',
    },
    {
        icon: <TrendIcon />,
        title: 'anh luôn như vậy',
    },
    {
        icon: <TrendIcon />,
        title: 'lệ lưu ly',
    },
    {
        icon: <TrendIcon />,
        title: 'giờ thì ai cười',
    },
    {
        icon: <TrendIcon />,
        title: 'tất cả hoặc không là gì cả',
    },
];

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 1000);
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div>
            <Tippy
                visible={showResult && searchResult.length > 0}
                offset={[0, 0]}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Đề xuất cho bạn</h4>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('wrapper')}>
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <ClearIcon />
                        </button>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
