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
    isLooping: boolean,
    isShuffling: boolean,
    togglePlay: () => void,
    setIsPlayingState: (state: boolean) => void,
    play: (episode: Episode) => void,
    playList: (list: Episode[], index: number) => void,
    shuffleOn: (index: number) => void,
    playNextEpisode: () => void,
    playPreviousEpisode: () => void,
    toggleShuffle: () => void,
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
    const [isShuffling, setIsShuffling] = useState(false);

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

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function shuffleOn(index: number){
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
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
        playList,
        shuffleOn,
        isPlaying, 
        isLooping,
        isShuffling,
        togglePlay, 
        setIsPlayingState, 
        playNextEpisode,
        playPreviousEpisode,
        toggleLoop,
        toggleShuffle,
  }}>
            {children}
        </PlayerContext.Provider>
    )
}