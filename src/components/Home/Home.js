import './Home.css'
import Search from '../Search/Search';
import MyPlaylist from '../MyPlaylist/MyPlaylist';
import PublicPlaylist from '../PublicPlaylist/PublicPlaylist';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Search />
            <MyPlaylist />
            <PublicPlaylist />
        </>
    );
}

export default Home;