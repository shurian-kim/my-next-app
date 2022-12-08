import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => console.log((error as any).message)
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  )
}
