import '../Player/Player.css'
import Plyr from "plyr-react";
import { useEffect, useRef, useState } from 'react';


const Player = ({ urls, index, handleEnded }) => {
    const [ended, setEnded] = useState(false)
    const videoSrc = {
        type: "video",
        sources: [
            {
                src: urls[index],
                provider: "youtube"
            }
        ],
    };
    const plyrRef = useRef(null);
    useEffect(() => {

        // console.log(plyrRef.current.plyr);
    }
    )
    return (
        <div className='Player'  >
            <Plyr
                ref={plyrRef}
                source={videoSrc}
                options={{
                    autoplay: true,
                    ratio: '5:3',
                }}
            />

        </div >
    )
}
export default Player;