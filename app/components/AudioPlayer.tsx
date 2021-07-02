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
                    toggleMode={false}
                    autoPlay={false}
                    defaultVolume={0.3}
                    mode='full'
                    theme='auto' />}
        </div>
    )
}

export default AudioPlayer;
