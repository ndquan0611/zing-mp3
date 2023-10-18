import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { HeartIcon, MoreIcon, icons } from '~/components/Icons';
import { play, setCurSongId } from '~/redux/actions/musicAction';
import { show } from '~/redux/actions/homeAction';
import * as musicService from '~/services/musicService';
import Image from '~/components/Image';
import styles from './Player.module.scss';
import moment from 'moment';
import { Loading } from '~/components/Loading';

const {
    BiShuffle,
    BiSkipPrevious,
    BiSkipNext,
    BsRepeat,
    BsPauseFill,
    BsPlayFill,
    PiRepeatOnceLight,
    BsMusicNoteList,
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
} = icons;
const cx = classNames.bind(styles);
let intervalId;

function Player() {
    const { isShow } = useSelector((state) => state.app);
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

    const [infoSong, setInfoSong] = useState({});
    const [curSeconds, setCurSeconds] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(100);
    const [audio, setAudio] = useState(new Audio());

    const dispatch = useDispatch();

    const thumRef = useRef();
    const trackRef = useRef();

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(false);
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
            setIsLoading(true);
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
            } else if (repeatMode) {
                repeatMode === 1 ? handleNextSong() : handleRepeatOnce();
            } else {
                handleNextSong();
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isShuffle, repeatMode]);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);

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

    const handleRepeatOnce = () => {
        audio.play();
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
                            {!isLoading ? (
                                <Loading />
                            ) : isPlaying ? (
                                <BsPauseFill size={30} />
                            ) : (
                                <BsPlayFill size={30} />
                            )}
                        </button>
                        <button
                            className={cx('player-btn', `${!songs ? 'pointer-events-auto opacity-50' : ''}`)}
                            onClick={handleNextSong}
                        >
                            <BiSkipNext size={28} />
                        </button>
                        <button
                            className={cx('player-btn', `${repeatMode && 'text-primary'}`)}
                            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
                        >
                            {repeatMode === 2 ? <PiRepeatOnceLight /> : <BsRepeat />}
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
                    <div className={cx('flex items-center gap-1')}>
                        <button
                            onClick={() => {
                                setVolume((prev) => (prev === 0 ? 50 : 0));
                            }}
                        >
                            {+volume === 0 ? <BsFillVolumeMuteFill size={24} /> : <BsFillVolumeDownFill size={24} />}
                        </button>
                        <input
                            type="range"
                            step={1}
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </div>
                    <button
                        className={cx('p-1 rounded-[4px] bg-darkPrimary hover:opacity-100 opacity-90 cursor-pointer')}
                        onClick={() => dispatch(show(!isShow))}
                    >
                        <BsMusicNoteList />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player;
