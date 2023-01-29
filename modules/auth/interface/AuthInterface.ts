import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";

export interface IAuthToken {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthContext {
    accessTokenKey: string;
    setAccessTokenKey: Dispatch<SetStateAction<string>>;
    refreshTokenKey: string;
    setRefreshTokenKey: Dispatch<SetStateAction<string>>;
    authToken: IAuthToken | null;
    setAuthToken?: Dispatch<SetStateAction<IAuthToken | null>>;
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    refreshToken: string;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    removeToken: boolean;
    setRemoveToken: Dispatch<SetStateAction<boolean>>;
    accessTokenStorage: Storage | null;
    setAccessTokenStorage: Dispatch<SetStateAction<Storage | null>>;
    refreshTokenStorage: Storage | null;
    setRefreshStorage: Dispatch<SetStateAction<Storage | null>>;
}

export interface IAuthComponentProvidorOptions {
    accessTokenKey?: string;
    accessTokenStorage?: string;
    refreshTokenKey?: string;
    refreshTokenStorage?: string;
    logLevel?: string;
}

export interface IAuthComponentProvidorProps {
    children: ReactElement<any, string | JSXElementConstructor<any>> | null;
    options?: IAuthComponentProvidorOptions
}

export interface IAuthComponentProps {
    Component: NextComponentType<NextPageContext, any, any>;
    router: Router;
    pageProps?: any;
    Loading?: (props?: any) => JSX.Element;
    Login?: (props?: any) => JSX.Element;
    pathChecker?: (router: Router) => boolean;
    logLevel?: string;
}