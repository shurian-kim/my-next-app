import { logger } from "./utils/logger";
import { createContext, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";
import type { IAuthComponentProvidorProps as IAuthComponentProvidorPropsType, IAuthComponentProvidorOptions as IAuthComponentProvidorOptionsType, IAuthContext as IAuthContextType } from './interface/AuthInterface';

export interface IAuthComponentProvidorProps extends IAuthComponentProvidorPropsType{};
export interface IAuthComponentProvidorOptions extends IAuthComponentProvidorOptionsType{};
export interface IAuthContext extends IAuthContextType{};

export const AuthComponentProvidorConst = {
    _ACCESS_TOKEN_KEY : "accessToken",
    _REFRESH_TOKEN_KEY: "refreshToken",
    _LOCAL_STORAGE : "localStorage",
    _SESSION_STORAGE : "sessionStorage"
}

export const AuthContext = createContext<IAuthContext>({
    accessTokenKey: '',
    setAccessTokenKey: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    refreshTokenKey: '',
    setRefreshTokenKey: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    authToken: null,
    accessToken: '',
    setAccessToken: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    refreshToken: '',
    setRefreshToken: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    removeToken: false,
    setRemoveToken: function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
    },
    accessTokenStorage: null,
    setAccessTokenStorage: function (value: SetStateAction<Storage | null>): void {
        throw new Error('Function not implemented.');
    },
    refreshTokenStorage: null,
    setRefreshStorage: function (value: SetStateAction<Storage | null>): void {
        throw new Error('Function not implemented.');
    }
});

export default function AuthComponentProvidor(props: IAuthComponentProvidorProps): ReactElement | null {

    const children = props.children;
    const accessTokenKeyProps = props.options?.accessTokenKey ?? AuthComponentProvidorConst._ACCESS_TOKEN_KEY;
    const refreshTokenKeyProps = props.options?.refreshTokenKey ?? AuthComponentProvidorConst._REFRESH_TOKEN_KEY;
    const accessTokenStorageProps = props.options?.accessTokenStorage ?? AuthComponentProvidorConst._SESSION_STORAGE;
    const refreshTokenStorageProps = props.options?.refreshTokenStorage ?? AuthComponentProvidorConst._SESSION_STORAGE;
    const logLevel = props.options?.logLevel ?? "info";

    logger.setInstanceName("AuthComponentProvidor");
    logger.setLogLevel(logLevel);

    const [accessTokenKey, setAccessTokenKey] = useState(accessTokenKeyProps);
    const [refreshTokenKey, setRefreshTokenKey] = useState(refreshTokenKeyProps);

    const [authToken, setAuthToken] = useState<{ accessToken: string, refreshToken: string } | null>(null);

    const [accessTokenStorage, setAccessTokenStorage] = useState<Storage | null>(null);
    const [refreshTokenStorage, setRefreshStorage] = useState<Storage | null>(null);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const [removeToken, setRemoveToken] = useState(false);

    const authContextValue = useMemo(() => {
        return {
            accessTokenKey, refreshTokenKey, authToken, accessToken, refreshToken, removeToken, accessTokenStorage, refreshTokenStorage,
            setAccessTokenKey, setRefreshTokenKey, setAuthToken, setAccessToken, setRefreshToken, setRemoveToken, setAccessTokenStorage, setRefreshStorage
        }
    }, [
        accessTokenKey, refreshTokenKey, authToken, accessToken, refreshToken, removeToken, accessTokenStorage, refreshTokenStorage,
        setAccessTokenKey, setRefreshTokenKey, setAuthToken, setAccessToken, setRefreshToken, setRemoveToken, setAccessTokenStorage, setRefreshStorage
    ]);

    useEffect(() => {
        setAccessTokenStorage(accessTokenStorageProps === AuthComponentProvidorConst._LOCAL_STORAGE ? window.localStorage : window.sessionStorage);
        setRefreshStorage(refreshTokenStorageProps === AuthComponentProvidorConst._LOCAL_STORAGE ? window.localStorage : window.sessionStorage);
    }, []);

    if (accessTokenStorage !== null && refreshTokenStorage !== null) {

        if (removeToken) {
            logger.debug("🤦‍♀️ removeToken : ", removeToken, "🤦‍♂️");
            accessTokenStorage.removeItem(accessTokenKey);
            refreshTokenStorage.removeItem(refreshTokenKey);
            setRemoveToken(false);
        }

        const accessTokenStorageAccessToken = accessTokenStorage.getItem(accessTokenKey) ?? "";
        if (accessToken.length > 0) {

            if (accessToken !== accessTokenStorageAccessToken) {

                logger.debug("👍set Authorization access Token : ", accessToken, "👌");
                accessTokenStorage.setItem(accessTokenKey, accessToken);
            }
        } else {

            if (accessTokenStorageAccessToken.length > 0) {
                setAccessToken(accessTokenStorage.getItem(accessTokenKey) ?? "");
            }
        }

        const refreshTokenStorageRefreshToken = refreshTokenStorage.getItem(refreshTokenKey) ?? "";
        if (refreshToken.length > 0) {

            if (refreshToken !== refreshTokenStorageRefreshToken) {

                logger.debug("👍set Authorization refresh Token : ", refreshToken, "👌");
                refreshTokenStorage.setItem(refreshTokenKey, refreshToken);
            }
        } else {

            if (refreshTokenStorageRefreshToken.length > 0) {
                setRefreshToken(refreshTokenStorage.getItem(refreshTokenKey) ?? "");
            }
        }
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}