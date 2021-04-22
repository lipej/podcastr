import { createContext } from 'react'


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    durationAsString: string;
    url: string;
}

type PlayerContext = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    playerToggle: () => void,
    setIsPlayingState: (state: boolean) => void,
    play: (episode: Episode) => void,
}

export const PlayerContext = createContext({} as PlayerContext);