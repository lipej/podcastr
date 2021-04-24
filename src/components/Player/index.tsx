
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'


import { PlayerContext } from '../../Context/PlayerContext';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


export function Player() {
    const audioRefs = useRef<HTMLAudioElement>(null);
    const { episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        isLooping, 
        isShuffling, 
        toggleShuffle, 
        toggleLoop, 
        togglePlay, 
        setIsPlayingState, 
        playNextEpisode, 
        playPreviousEpisode,
        shuffleOn } = useContext(PlayerContext)
    const episode = episodeList[currentEpisodeIndex]
    const [progress, setProgress] = useState(0)

    function setupProgressListener() {
        audioRefs.current.currentTime = 0;

        audioRefs.current.addEventListener('timeupdate', () => {
            setProgress(audioRefs.current.currentTime)
        })
    }

    function handleProgress(time: number) {
        audioRefs.current.currentTime = time;
        setProgress(time);
    }

    function handleShuffle() {
        isShuffling ? shuffleOn(getShuffle()) : ''
    }

    function getShuffle(){
        const number = Math.floor(Math.random() * episodeList.length - 1)
        return number
    }


    useEffect(() => {
        if (!audioRefs.current) {
            return
        }
        isPlaying ? audioRefs.current.play() : audioRefs.current.pause();
    }, [isPlaying])

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover" />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>

            ) : (

                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}


            <footer className={!episode ? styles.empty : ''}>

                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(Math.floor(progress))}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                                max={episode.duration}
                                value={progress}
                                onChange={handleProgress}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{!episode ? '00:00:00' : episode.durationAsString}</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRefs}
                        autoPlay
                        loop={isLooping}
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleShuffle}
                         />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode} onClick={() => toggleShuffle()} className={isShuffling ? styles.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={currentEpisodeIndex <= 0} onClick={() => playPreviousEpisode()}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={() => togglePlay()}>
                        {isPlaying ? (
                            <img src="/pause.svg" alt="Tocar" />
                        ) : (
                            <img src="/play.svg" alt="Tocar" />
                        )}
                    </button>
                    <button type="button" disabled={currentEpisodeIndex >= episodeList.length - 1} onClick={() => playNextEpisode()}>
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>
                    <button type="button" disabled={!episode} onClick={() => toggleLoop()} className={isLooping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}