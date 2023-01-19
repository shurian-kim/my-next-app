import { AppProps } from 'next/app'
import AppLayout from 'src/components/layout/AppLayout'
import { AuthContext } from "@/pages/_app";
import { useContext, useEffect } from 'react';
// import { GetServerSideProps } from 'next/types'
// import fetch from 'node-fetch'
// import fs from 'fs';
// import path from 'path'

export default function Home({ Component, pageProps }: AppProps): JSX.Element {
  // logger.debug('process.env.NEXT_PUBLIC_ACCESS_TOCKEN = ', process.env.NEXT_PUBLIC_ACCESS_TOCKEN)
  // logger.debug(pageProps)

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (typeof setAccessToken !== "undefined") {
      setAccessToken("Bearer AWS4-HMAC-SHA256");
    }
  }, [])

  return (
    <AppLayout>
      토큰 : {accessToken}
    </AppLayout>
  )
}

// ### 서버 실행 환경 (Server Side Rendering)
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // 서버에서는 모든 환경변수를 참조할 수 있다.
//   // logger.debug(process.env.NEXT_PUBLIC_ACCESS_TOCKEN); // default_value
//   // logger.debug(process.env.NEXT_PUBLIC_ACCESS_TOCKEN); // default_api_key

//   return { props: { message: `Next.js is awesome` } };
// };

// ### 동적데이터 추가 (Static Site Generation)
// export async function getStaticProps(context: any) {
//   const res = await fetch(
//     'https://dog.ceo/api/breeds/image/random'
//   );
//   const data = await res.json();
//   return {
//     props: { data }
//   };
// };

// export async function getStaticProps(context: any) {
//   const file = path.join(process.cwd(), '@/asset/data.txt');
//   const content = fs.readFileSync(file, 'utf8');
// return {
//     props: { content }
//   };
// };