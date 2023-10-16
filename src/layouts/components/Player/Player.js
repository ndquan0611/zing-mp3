import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { HeartIcon, MoreIcon, icons } from '~/components/Icons';
import { play, setCurSongId } from '~/redux/actions/musicAction';
import * as musicService from '~/services/musicService';
import Image from '~/components/Image';
import styles from './Player.module.scss';
import moment from 'moment';

const { BiShuffle, BiSkipPrevious, BiSkipNext, BsRepeat, BsPlayCircle, BsPauseCircle, GiMicrophone, FiVolume2 } = icons;
const cx = classNames.bind(styles);
let intervalId;

function Player() {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

    const [infoSong, setInfoSong] = useState({});
    const [curSeconds, setCurSeconds] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [audio, setAudio] = useState(new Audio());

    const dispatch = useDispatch();

    const thumRef = useRef();
    const trackRef = useRef();

    useEffect(() => {
        const fetchApi = async () => {
            const resultInfoSong = await musicService.getInfoSong(curSongId);
            const resultSong = await musicService.getSong(curSongId);
            setInfoSong(resultInfoSong);
            if (resultSong) {
                audio.pause();
                setAudio(new Audio(resultSong['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(play(false));
                // toast
                console.log('vip');
            }
        };
        fetchApi();
    }, [curSongId]);

    useEffect(() => {
        audio.pause();
        audio.load();
        audio.currentTime = 0;
        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / infoSong.duration) / 100;
                thumRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSeconds(Math.round(audio.currentTime));
            }, 200);
        }

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [audio]);

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffle();
            } else if (isRepeat) {
                handleNextSong();
            } else {
                audio.pause();
                dispatch(play(false));
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isShuffle, isRepeat]);

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(play(false));
        } else {
            audio.play();
            dispatch(play(true));
        }
    };

    const handleClickProgressbar = (e) => {
        const tractRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - tractRect.left) * 10000) / tractRect.width) / 100;
        thumRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = (percent * infoSong.duration) / 100;
        setCurSeconds(Math.round((percent * infoSong.duration) / 100));
    };

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex;
            songs.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                }
            });
            dispatch(setCurSongId(songs[currentSongIndex - 1].encodeId));
            dispatch(play(true));
        }
    };

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                }
            });
            dispatch(setCurSongId(songs[currentSongIndex + 1].encodeId));
            dispatch(play(true));
        }
    };

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length - 1);
        dispatch(setCurSongId(songs[randomIndex].encodeId));
        dispatch(play(true));
    };

    const handleRepeat = () => {
        setIsRepeat((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('thumbnail')}>
                        <Image
                            src={infoSong.thumbnailM}
                            alt={infoSong.title}
                            className={cx('w-full h-auto object-cover')}
                        />
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>
                            <Link to={infoSong.link}>{infoSong.title}</Link>
                        </h3>
                        <div className={cx('artists')}>
                            <span>{infoSong.artistsNames}</span>
                        </div>
                    </div>
                    <div className={cx('ml-[10px] flex items-center')}>
                        <button className={cx('more-btn')}>
                            <HeartIcon />
                        </button>
                        <button className={cx('more-btn')}>
                            <MoreIcon />
                        </button>
                    </div>
                </div>
                <div className={cx('player-control')}>
                    <div className={cx('w-full flex items-center justify-center')}>
                        <button
                            className={cx('player-btn', `${isShuffle && 'text-primary'}`)}
                            onClick={() => setIsShuffle((prev) => !prev)}
                        >
                            <BiShuffle />
                        </button>
                        <button
                            className={cx('player-btn', `${!songs ? 'pointer-events-auto opacity-50' : ''}`)}
                            onClick={handlePrevSong}
                        >
                            <BiSkipPrevious size={28} />
                        </button>
                        <button className={cx('player-btn', 'play-btn')} onClick={handleTogglePlayMusic}>
                            {isPlaying ? <BsPauseCircle size={34} /> : <BsPlayCircle size={34} />}
                        </button>
                        <button
                            className={cx('player-btn', `${!songs ? 'pointer-events-auto opacity-50' : ''}`)}
                            onClick={handleNextSong}
                        >
                            <BiSkipNext size={28} />
                        </button>
                        <button className={cx('player-btn', `${isRepeat && 'text-primary'}`)} onClick={handleRepeat}>
                            <BsRepeat />
                        </button>
                    </div>
                    <div className={cx('w-full mt-3 flex items-center')}>
                        <span className={cx('time-left', 'mr-[10px]')}>
                            {moment.utc(curSeconds * 1000).format('mm:ss')}
                        </span>
                        <div ref={trackRef} className={cx('progress-bar')} onClick={handleClickProgressbar}>
                            <div ref={thumRef} className={cx('absolute top-0 left-0 bottom-0 rounded bg-white')}></div>
                        </div>
                        <span className={cx('time-right', 'ml-[10px]')}>
                            {moment.utc(infoSong.duration * 1000).format('mm:ss')}
                        </span>
                    </div>
                </div>
                <div className={cx('right')}>
                    <button>
                        <GiMicrophone />
                    </button>
                    <button>
                        <FiVolume2 />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player;
