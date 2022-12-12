import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {  RecoilRoot} from 'recoil';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Login from './login';
import { passPageAuth } from 'src/utils/authenticator';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => console.log((error as any).message)
    },
  }
})

export default function App({ Component, pageProps, router }: AppProps) {

  const props: any = { ...pageProps }

  const isPassPageAuth = passPageAuth(router)
  if (!isPassPageAuth) {
    props.redirectUrl = router.pathname;
  }

  return (
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