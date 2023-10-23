import { useSelector } from 'react-redux';
import Chart from '~/components/Chart';
import Gallery from '~/components/Gallery';
import NewRelease from '~/components/NewRelease';
import Playlist from '~/components/Playlist';
import WeekChart from '~/components/WeekChart';

function Home() {
    const { chill, loveLife, remix, status, popular, top100, album } = useSelector((state) => state.app);

    return (
        <div id="home">
            <Gallery />
            <NewRelease />
            <Playlist data={chill} />
            <Playlist data={loveLife} />
            <Playlist data={remix} />
            <Playlist data={status} />
            <Playlist data={popular} />
            <Chart />
            <WeekChart />
            <Playlist data={top100} />
            <Playlist data={album} />
        </div>
    );
}

export default Home;
