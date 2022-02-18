import '../Player/Player.css'
import Plyr from "plyr-react";
import { useEffect, useRef } from 'react';


const Player = ({ url }) => {

    // const [ended, setEnded] = useState(false)
    const videoSrc = {
        type: "video",
        sources: [
            {
                src: url,
                provider: "youtube"
            }

        ],
    };
    const plyrRef = useRef();

    useEffect(() => {
        console.log("##############", plyrRef.current.plyr)
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