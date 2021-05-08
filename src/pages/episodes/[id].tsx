import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import Head from 'next/head';


import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './episodes.module.scss'
import React, { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';


type Episode = {
    id: string;
    title: string;
    members: string;
    published_at: string;
    description: string;
    thumbnail: string;
    duration: number;
    durationAsString: string;
    url: string;
}

interface EpisodeProps {
    episode: Episode;
}


export default function Episode({ episode }: EpisodeProps) {
    const router = useRouter();
    const { play } = useContext(PlayerContext)


    return (
        <div className={styles.episode}>
                  <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button"  onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <p><span>{episode.members}</span></p>
                <span>{episode.published_at}</span>
                <span>{episode.durationAsString}</span>

            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;

    const { data } = await api.get(`/episodes/${id}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        published_at: format(parseISO(data.published_at), 'd, MMM yy', { locale: ptBR }),
        duration: Number(data.fileduration),
        durationAsString: convertDurationToTimeString(Number(data.fileduration)),
        description: data.description,
        url: data.fileurl
    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24,
    }

}