import '@/styles/globals.css';
import { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import Router from "next/router";
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil';
import { passPageAuth } from '@/utils/authenticator';
import Login from './login';
import FullScreenLoading from "@/components/FullScreenLoading";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error): void => { console.log((error as any).message) }
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 이미 캐시에 데이터가 있는 경우에만 오류 알림을 표시합니다.
      // 이는 백그라운드 업데이트가 실패했음을 의미합니다.
      if (query.state.data !== undefined) {
        console.error(`Something went wrong:`, (error as any).message)
      }
    },
  })
})

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (): void => {
      // NProgress.start();
      setLoading(true);
    };
    const end = (): void => {
      // NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const props: any = { ...pageProps }

  const isPassPageAuth: boolean = passPageAuth(router)
  if (!isPassPageAuth) {
    props.redirectUrl = router.pathname;
  }

  return loading ? (
    <FullScreenLoading />
  ) : (
    <div>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {
            isPassPageAuth
              ?
              <Component {...props} />
              :
              <Login {...props} />
          }
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  )
}