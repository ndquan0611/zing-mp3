import config from '~/config';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import Radio from '~/pages/Radio';
import ZingChart from '~/pages/ZingChart';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
