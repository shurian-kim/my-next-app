import { logger } from "@/utils/logger";
import { createContext, Dispatch, JSXElementConstructor, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";

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
    authStorage: Storage | null;
    setAuthStorage: Dispatch<SetStateAction<Storage | null>>;
}

export const AuthContext = createContext<IAuthContext>({
    accessTokenKey: "",
    refreshTokenKey: "",
    accessToken: '',
    refreshToken: '',
    authToken: null,
    removeToken: false,
    authStorage: null,
    setAccessToken: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    setRefreshToken: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    setRemoveToken: function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
    },
    setAuthStorage: function (value: SetStateAction<Storage | null>): void {
        throw new Error("Function not implemented.");
    },
    setAuthToken: function (value: SetStateAction<IAuthToken | null>): void {
        throw new Error("Function not implemented.");
    },
    setAccessTokenKey: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    },
    setRefreshTokenKey: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    }
});

export interface AuthComponentProvidorOptions {
    accessTokenKey?: string;
    refreshTokenKey?: string;
}

export interface AuthComponentProvidorProps {
    children: ReactElement<any, string | JSXElementConstructor<any>> | null;
    options?: AuthComponentProvidorOptions
}

export default function AuthComponentProvidor(props: AuthComponentProvidorProps): ReactElement | null {

    const children = props.children;
    const accessTokenKeyProps = props.options?.accessTokenKey ?? "accessToken";
    const refreshTokenKeyProps = props.options?.refreshTokenKey ?? "refreshToken";

    const [accessTokenKey, setAccessTokenKey] = useState(accessTokenKeyProps);
    const [refreshTokenKey, setRefreshTokenKey] = useState(refreshTokenKeyProps);

    const [authToken, setAuthToken] = useState<{ accessToken: string, refreshToken: string } | null>(null);

    const [authStorage, setAuthStorage] = useState<Storage | null>(null);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const [removeToken, setRemoveToken] = useState(false);

    const authContextValue = useMemo(() => {
        return {
            accessTokenKey, refreshTokenKey, authToken, accessToken, refreshToken, removeToken, authStorage,
            setAccessTokenKey, setRefreshTokenKey, setAuthToken, setAccessToken, setRefreshToken, setRemoveToken, setAuthStorage
        }
    }, [
        accessTokenKey, refreshTokenKey, authToken, accessToken, refreshToken, removeToken, authStorage,
        setAccessTokenKey, setRefreshTokenKey, setAuthToken, setAccessToken, setRefreshToken, setRemoveToken, setAuthStorage
    ]);

    useEffect(() => {
        setAuthStorage(window.sessionStorage);
    }, []);

    if (authStorage !== null) {

        if (removeToken) {
            logger.debug("🤦‍♀️ removeToken : ", removeToken, "🤦‍♂️");
            authStorage.removeItem(accessTokenKey);
            authStorage.removeItem(refreshTokenKey);
            setRemoveToken(false);
        }

        const authStorageAccessToken = authStorage.getItem(accessTokenKey) ?? "";
        if (accessToken.length > 0) {

            if (accessToken !== authStorageAccessToken) {

                logger.debug("👍set Authorization access Token : ", accessToken, "👌");
                authStorage.setItem(accessTokenKey, accessToken);
            }
        } else {

            if (authStorageAccessToken.length > 0) {
                setAccessToken(authStorage.getItem(accessTokenKey) ?? "");
            }
        }

        const authStorageRefreshToken = authStorage.getItem(refreshTokenKey) ?? "";
        if (refreshToken.length > 0) {

            if (refreshToken !== authStorageRefreshToken) {

                logger.debug("👍set Authorization refresh Token : ", refreshToken, "👌");
                authStorage.setItem(refreshTokenKey, refreshToken);
            }
        } else {

            if (authStorageRefreshToken.length > 0) {
                setRefreshToken(authStorage.getItem(refreshTokenKey) ?? "");
            }
        }
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}