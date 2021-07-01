import * as React from "react";
import '@vime/core/themes/default.css';
import { Player, Video, DefaultUi } from '@vime/react';
import SelectBox from '../components/SelectBox';

type VPType = {
    videoList: Array<{
        name: string,
        src: string
    }>,
}

const VideoPlayer = ({ videoList }: VPType) => {
    const player = React.useRef<HTMLVmPlayerElement>(null);
    const [currentVideoSrc, setCurrentVideoSrc] = React.useState('');

    const changeVideo = (item) => {
        console.log(item);
        setCurrentVideoSrc(item.src);
    }

    React.useEffect(() => {
        if (videoList.length > 0) setCurrentVideoSrc(videoList[0].src);
    }, [ videoList ])

    return (
        <>
            {videoList.length > 0 && 
                <div className='container mx-auto max-w-screen-lg'>
                    <header className="flex items-center justify-center">
                            <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Video Content</h2>
                    </header>
                    <div className="z-0 pt-4">
                        <Player ref={player}>
                            <Video crossOrigin="">
                                <source
                                    data-src={currentVideoSrc}
                                    type="video/mp4"
                                />
                            </Video>

                            <DefaultUi >
                            </DefaultUi>
                        </Player>
                    </div>
                    <div className="py-4 flex items-center z-10">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">Videos available: </h3>
                        <div className="px-4">
                            <SelectBox items={videoList} cb={changeVideo} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default VideoPlayer;
