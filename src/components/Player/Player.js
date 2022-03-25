import '../Player/Player.css'
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useContext, useEffect, useRef } from 'react';
import songIndexContext from '../../Contexts/songIndexContext';

const Player = () => {
    const { songPlayer } = useContext(songIndexContext)
    console.log('player render');
    // const [ended, setEnded] = useState(false)
    const videoSrc = {
        type: "video",
        sources: [
            {
                src: songPlayer,
                provider: "youtube"
            }

        ],
    };
    const plyrRef = useRef();

    useEffect(() => {
        // console.log("##############", plyrRef.current.plyr)
        // plyrRef.current.plyr.fullscreen.enter()

        // plyrRef.current.plyr.on("ended", () => {
        //     console.log('endd');
        // })
    }
    )
    return (
        <div className='Player'  >
            <Plyr
                ref={plyrRef}
                source={videoSrc}
                options={{
                    ratio: '5:3',
                    autoplay: true,

                }}
            />
        </div >
    )
}
export default Player;