import React, { useEffect } from "react";

export default function Home(props) {
  return (
    <div>

    <h1>Podcastr</h1>
    <p>{JSON.stringify(props.episodes)}</p>

    </div>

  )
}

export async function getStaticProps(){
  const url = 'http://localhost:3333/episodes'
  
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8
  }
}
