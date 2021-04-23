
import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'


import { PlayerContext } from '../../Context/PlayerContext';
import styles from './styles.module.scss';


export function Player() {

    const audioRefs = useRef<HTMLAudioElement>(null);

    const { episodeList, currentEpisodeIndex, isPlaying, playerToggle, setIsPlayingState, playNextEpisode, playPreviousEpisode } = useContext(PlayerContext)

    const episode = episodeList[currentEpisodeIndex]

    console.log(currentEpisodeIndex)
    console.log(episodeList)

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
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{!episode ? '00:00' : episode.durationAsString}</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRefs}
                        autoPlay
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}
                         />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode} >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={currentEpisodeIndex <= 0} onClick={() => playPreviousEpisode()}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={() => playerToggle()}>
                        {isPlaying ? (
                            <img src="/pause.svg" alt="Tocar" />
                        ) : (
                            <img src="/play.svg" alt="Tocar" />
                        )}
                    </button>
                    <button type="button" disabled={currentEpisodeIndex >= episodeList.length - 1} onClick={() => playNextEpisode()}>
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}