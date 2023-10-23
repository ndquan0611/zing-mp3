import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import classNames from 'classnames/bind';
import { SongItem } from '~/components/NewRelease/Song';
import Button from '~/components/Button';
import config from '~/config';
import styles from './Chart.module.scss';

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
    const { chart, rank } = useSelector((state) => state.app);
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [selected, setSelected] = useState();
    const chartRef = useRef();
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.2)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: '#959098' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;

                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }

                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        const items = chart?.items;
                        if (items) {
                            const item = items[Object.keys(items)[i]];
                            if (item) {
                                counters.push({
                                    data: item?.filter((item) => +item.hour % 2 === 0)?.map((item) => item?.counter),
                                    encodeId: Object.keys(items)[i],
                                });
                            }
                        }
                    }

                    const rs = counters.find((item) =>
                        item.data.some((line) => line === +tooltip.body[0]?.lines[0]?.replace('.', '')),
                    );

                    setSelected(rs.encodeId);

                    const newTooltipData = {
                        opacity: 1,
                        top: tooltip.caretY,
                        left: tooltip.caretX,
                    };

                    if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };

    useEffect(() => {
        const labels = chart?.times?.filter((item) => +item.hour % 2 === 0)?.map((item) => `${item.hour}:00`);
        const datasets = [];
        for (let i = 0; i < 3; i++) {
            const items = chart?.items;
            if (items) {
                const item = items[Object.keys(items)[i]];
                if (item) {
                    datasets.push({
                        data: item?.filter((item) => +item.hour % 2 === 0)?.map((item) => item?.counter),
                        borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                        tension: 0.3,
                        borderWidth: 2,
                        pointHoverRadius: 5,
                        pointBackgroundColor: 'white',
                        pointHitRadius: 5,
                        pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                        pointHoverBorderWidth: 5,
                        animation: false,
                    });
                }
            }
        }
        setData({ labels, datasets });
    }, [chart]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('blur')}></div>
            <div className={cx('alpha')}></div>
            <h3 className={cx('title')}>
                <Link to={config.routes.zingChart}>#zingchart</Link>
            </h3>
            <div className={cx('content')}>
                <div className={cx('w-1/3 px-[14px]')}>
                    {rank.slice(0, 3).map((item, index) => (
                        <SongItem
                            key={item.encodeId}
                            data={item}
                            isDate={false}
                            order={index + 1}
                            percent={Math.round((item.score * 100) / chart?.totalScore)}
                            isRank
                        />
                    ))}

                    <div className={cx('flex items-center justify-center')}>
                        <Button
                            to={config.routes.zingChart}
                            small
                            curved
                            className={cx('mt-[5px] border-white hover:bg-borderPrimary')}
                        >
                            Xem thêm
                        </Button>
                    </div>
                </div>
                <div className={cx('relative w-4/6 px-[14px]')}>
                    <Line ref={chartRef} data={data} options={options} height={300} />
                    <div
                        className={cx('tooltip')}
                        style={{
                            opacity: tooltipState.opacity,
                            top: tooltipState.top,
                            left: tooltipState.left,
                            position: 'absolute',
                            zIndex: '10',
                        }}
                    >
                        <SongItem data={rank?.find((item) => item.encodeId === selected)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;
