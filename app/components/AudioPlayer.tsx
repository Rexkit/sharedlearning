import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css'

type APtype = {
    audioList: Array<{
        name: string,
        musicSrc: string
    }>,
}

const AudioPlayer = ({ audioList }: APtype) => {
    const [MPLists, setMPLists] = React.useState(audioList);

    React.useEffect(() => {
        console.log(audioList);
        setMPLists(audioList);
    }, [ audioList ]);

    return (
        <div>
            {MPLists.length > 0 &&
                <ReactJkMusicPlayer
                    showMediaSession
                    audioLists={MPLists}
                    clearPriorAudioLists
                    showReload={false}
                    showDownload={false}
                    showThemeSwitch={false}
                    showLyric={false}
                    showDestroy={false}
                    remove={false}
                    responsive={false}
                    autoPlay={false}
                    defaultPosition={{
                        right: 50,
                        bottom: 50,
                    }}
                    defaultVolume={0.3}
                    mode='mini'
                    theme='auto' />}
        </div>
    )
}

export default AudioPlayer;
