import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Auth from './auth'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Transactions App</title>
        <meta name="description" content="Simba Transaction app challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Auth />
      </main>
    </>
  )
}

export default Home
