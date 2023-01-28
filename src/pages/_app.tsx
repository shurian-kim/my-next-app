import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil';
import { logger } from '@/utils/logger';
import AuthComponentProvidor, { AuthComponentProvidorOptions } from "@/components/auth/AuthComponentProvidor";
import AuthComponent, { AuthComponentProps } from '@/components/auth/AuthComponent';
import FullScreenLoading from '@/components/FullScreenLoading';
import Login from './login';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error): void => { logger.debug((error as any).message) }
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 이미 캐시에 데이터가 있는 경우에만 오류 알림을 표시합니다.
      // 이는 백그라운드 업데이트가 실패했음을 의미합니다.
      if (query.state.data !== undefined) {
        logger.debug(`Something went wrong:`, (error as any).message)
      }
    },
  })
})

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {

  const props: any = { ...pageProps }

  const authComponentProps: AuthComponentProps = {
    Component,
    router,
    pageProps: props,
    Loading: FullScreenLoading,
    Login,
  }

  const authProvidorOptions: AuthComponentProvidorOptions = {
    accessTokenKey: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    refreshTokenKey: process.env.NEXT_PUBLIC_REFRESH_TOKEN
  }

  return (
    <AuthComponentProvidor options={authProvidorOptions}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AuthComponent {...authComponentProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </AuthComponentProvidor>
  )
}