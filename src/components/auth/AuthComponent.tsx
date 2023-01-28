import { useContext, useEffect, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import { publicPathChecker } from "@/utils/authenticator";
import { AuthContext, IAuthContext } from "./AuthComponentProvidor";
import { logger } from "@/utils/logger";

export interface AuthComponentProps {
    Component: NextComponentType<NextPageContext, any, any>;
    router: Router;
    pageProps?: any;
    Loading?: (props?: any) => JSX.Element;
    Login?: (props?: any) => JSX.Element;
    accessTokenKey?: string;
    refreshTokenKey?: string;
}

export default function AuthComponent({ Component, pageProps, router, Loading, Login }: AuthComponentProps): JSX.Element {

    const { accessToken, refreshToken, authStorage, accessTokenKey, refreshTokenKey } = useContext<IAuthContext>(AuthContext);


    const props: any = { ...pageProps }

    const [isPageLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (typeof Loading !== "undefined") {

            const start = (): void => {
                setIsLoading(true);
            };
            const end = (): void => {
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
        }
    }, [Loading]);

    const renderComponent = (): JSX.Element => {

        let isPublicPath: boolean = publicPathChecker(router)

        const accessTokenAuthFlag = accessToken?.length > 0;
        const refreshTokenAuthFlag = refreshToken?.length > 0;
        let pageLoadingFlag = isPageLoading;

        if (authStorage !== null) {

            const authStorageAccessTokenFlag = (authStorage.getItem(accessTokenKey) ?? "").length > 0;
            if (!accessTokenAuthFlag && authStorageAccessTokenFlag) {
                authStorage.setItem(accessTokenKey, accessToken);
                pageLoadingFlag = true;
            }

            const authStorageRefreshTokenFlag = (authStorage.getItem(refreshTokenKey) ?? "").length > 0;
            if (!refreshTokenAuthFlag && authStorageRefreshTokenFlag) {
                authStorage.setItem(refreshTokenKey, refreshToken);
            }

            if (pageLoadingFlag) {
                logger.debug("isPageLoading is true : FullScreenLoading Rendering");

                if (typeof Loading !== "undefined") {
                    return Loading();
                }
            }

            if (accessTokenAuthFlag) {
                isPublicPath = true;
            }

            if (isPublicPath) {
                logger.debug(`isPublicPath is true : Component Rendering`);
                return (<Component {...props} />);
            }

            if (!isPublicPath) {
                props.redirectUrl = router.pathname;
            }

            if (typeof Login !== "undefined") {
                logger.debug("isPublicPath is false : Login Rendering");
                return Login({ ...props });
            } else {
                return (
                    <>
                        <div>권한이 없습니다!!</div>
                    </>
                )
            }
        }

        if (pageLoadingFlag) {
            logger.debug("isPageLoading is true : FullScreenLoading Rendering");

            if (typeof Loading !== "undefined") {
                return Loading();
            }
        }

        return <></>;
    }

    return renderComponent();
}