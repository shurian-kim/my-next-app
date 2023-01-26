import '@/styles/globals.css';
import { useEffect, useState, createContext, Dispatch, SetStateAction, useMemo } from "react";
import type { AppProps } from 'next/app';
import Router from "next/router";
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil';
import { publicPathChecker } from '@/utils/authenticator';
import Login from './login';
import FullScreenLoading from "@/components/FullScreenLoading";
import { logger } from '@/utils/logger';

interface IAuthContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  refreshToken?: string;
  setRefreshToken?: Dispatch<SetStateAction<string>>;
  removeToken?: boolean;
  setRemoveToken?: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({});

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
  // logger.debug("props : ", props);

  const [isPageLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [removeToken, setRemoveToken] = useState(false);
  const authContextValue = useMemo(() => {
    return {
      accessToken, setAccessToken,
      refreshToken, setRefreshToken,
      removeToken, setRemoveToken,
    }
  }, [accessToken, setAccessToken,
    refreshToken, setRefreshToken,
    removeToken, setRemoveToken,]);

  const [seStorage, setSeStorage] = useState<Storage | null>(null);

  useEffect(() => {

    setSeStorage(window.sessionStorage);

    const start = (): void => {
      // NProgress.start();
      setIsLoading(true);
    };
    const end = (): void => {
      // NProgress.done();
      setIsLoading(false);
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

  const renderComponent = (): JSX.Element | undefined => {

    // logger.debug("accessToken : ", accessToken)

    let accessTokenAuthFlag = accessToken?.length > 0;
    // logger.debug("accessTokenAuthFlag : ", accessTokenAuthFlag);

    if (seStorage !== null) {

      logger.debug("removeToken : ", removeToken);
      if (removeToken) {
        seStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "");
        accessTokenAuthFlag = false;
        setRemoveToken(false);
      }

      if (accessTokenAuthFlag) {
        seStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "", accessToken);
      }

      if ((seStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "") ?? "").length > 0) {
        accessTokenAuthFlag = true;
      }

    }

    if (isPageLoading) {
      logger.debug("isPageLoading is true : FullScreenLoading Rendering");
      return (<FullScreenLoading />)
    }

    let isPublicPath: boolean = publicPathChecker(router)
    // logger.debug("isPublicPath : ", isPublicPath)

    if (accessTokenAuthFlag) {
      isPublicPath = true;
    }

    if (isPublicPath) {
      logger.debug(`isPublicPath is true : Component Rendering`);
      return (<Component {...props} />)
    }


    if (!isPublicPath) {
      props.redirectUrl = router.pathname;
    }

    logger.debug("isPublicPath is false : Login Rendering");
    return (<Login {...props} />)
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {renderComponent()}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </AuthContext.Provider>
  )
}