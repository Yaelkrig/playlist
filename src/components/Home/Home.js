import './Home.css'
import Search from '../Search/Search';
import MyPlaylist from '../MyPlaylist/MyPlaylist';
import PublicPlaylist from '../PublicPlaylist/PublicPlaylist';
import { useContext, useEffect } from 'react';
import IsHomePageContext from '../../Contexts/IsHomePageContext';


const Home = () => {
    const { setIsHomePage } = useContext(IsHomePageContext);
    useEffect(() => {
        setIsHomePage(true)
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='home'>
            <Search />
            <MyPlaylist />
            <PublicPlaylist />
        </div>
    );
}

export default Home;