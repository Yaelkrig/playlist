import '../Player/Player.css'
import { useContext } from 'react';
import songIndexContext from '../../Contexts/songIndexContext';

const Player = ({ playlist }) => {
    const { songPlayer } = useContext(songIndexContext);

    return (
        <div className='Player'  >
            <iframe title='youtube_iframe' width="90%" height="315"
                frameBorder="0"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={(e) => { console.log('end', e); }}
                src={`https://www.youtube.com/embed/${songPlayer}?autoplay=1`}>
            </iframe>
        </div >
    )
}
export default Player;