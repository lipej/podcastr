import { createContext, ReactNode, useState } from 'react'


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
    playList: (list: Episode[], index: number) => void,
    playNextEpisode: () => void,
    playPreviousEpisode: () => void,
    isLooping: boolean,
    toggleLoop: () => void,
}

export const PlayerContext = createContext({} as PlayerContext);


type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function playerToggle() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }


    function setIsPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function playNextEpisode(){
        setCurrentEpisodeIndex(currentEpisodeIndex +1)
    }

    function playPreviousEpisode(){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }

    return (
        <PlayerContext.Provider value={{ episodeList, 
        currentEpisodeIndex, 
        play, 
        isPlaying, 
        playerToggle, 
        setIsPlayingState, 
        playList,
        playNextEpisode,
        playPreviousEpisode,
        toggleLoop,
        isLooping,  }}>
            {children}
        </PlayerContext.Provider>
    )
}