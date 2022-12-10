import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next/types'
import styles from '../styles/Home.module.css'

export default function Home() {
  console.log('process.env.NEXT_PUBLIC_ACCESS_TOCKEN = ', process.env.NEXT_PUBLIC_ACCESS_TOCKEN)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        토큰 : {process.env.NEXT_PUBLIC_ACCESS_TOCKEN}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

// ### 서버 실행 환경 (SSR)
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 서버에서는 모든 환경변수를 참조할 수 있다.
  // console.log(process.env.NEXT_PUBLIC_ACCESS_TOCKEN); // default_value
  // console.log(process.env.NEXT_PUBLIC_ACCESS_TOCKEN); // default_api_key
  
  return { props: { message: `Next.js is awesome` } };
};
