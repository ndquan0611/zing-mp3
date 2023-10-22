import config from '~/config';
import Home from '~/pages/Home';
import ZingChart from '~/pages/ZingChart';
import Radio from '~/pages/Radio';
import MyMusic from '~/pages/MyMusic';
import Rating from '~/pages/Rating';
import Hub from '~/pages/Hub';
import Top100 from '~/pages/Top100';
import Playlist from '~/pages/Playlist';
import Album from '~/pages/Album';
import WeekChart from '~/pages/WeekChart';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.zingChart,
        component: ZingChart,
    },
    {
        path: config.routes.radio,
        component: Radio,
    },
    {
        path: config.routes.mymusic,
        component: MyMusic,
    },
    {
        path: config.routes.rating,
        component: Rating,
    },
    {
        path: config.routes.hub,
        component: Hub,
    },
    {
        path: config.routes.top100,
        component: Top100,
    },
    {
        path: config.routes.playlist,
        component: Playlist,
    },
    {
        path: config.routes.album,
        component: Album,
    },
    {
        path: config.routes.weekChart,
        component: WeekChart,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
