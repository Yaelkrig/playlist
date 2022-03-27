import './Home.css'
import Search from '../Search/Search';
import MyPlaylist from '../MyPlaylist/MyPlaylist';
import PublicPlaylist from '../PublicPlaylist/PublicPlaylist';

const Home = () => {

    return (
        <>
            <Search />
            <MyPlaylist />
            <PublicPlaylist />
        </>
    );
}

export default Home;