import { logger } from "./utils/logger";
import { useContext, useEffect, useState } from "react";
import { Router } from "next/router";
import { AuthContext } from "./AuthComponentProvidor";
import type { IAuthComponentProps as IAuthComponentPropsType, IAuthContext as IAuthContextType } from "./interface/AuthInterface"
import AppLayout from "@/components/layout/AppLayout";

export interface IAuthComponentProps extends IAuthComponentPropsType { };
export interface IAuthContext extends IAuthContextType { };

export default function AuthComponent({ Component, pageProps, router, Loading, Login, pathChecker, logLevel = "info" }: IAuthComponentProps): JSX.Element {

    logger.setInstanceName("AuthComponent");
    logger.setLogLevel(logLevel);

    const { accessToken, refreshToken, accessTokenKey, refreshTokenKey, accessTokenStorage, refreshTokenStorage } = useContext<IAuthContext>(AuthContext);

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

        let isPublicPath: boolean = typeof pathChecker !== "undefined" ? pathChecker(router) : true;

        const accessTokenAuthFlag = accessToken?.length > 0;
        const refreshTokenAuthFlag = refreshToken?.length > 0;
        let pageLoadingFlag = isPageLoading;

        if (accessTokenStorage !== null && refreshTokenStorage !== null) {

            const accessTokenStorageAccessTokenFlag = (accessTokenStorage.getItem(accessTokenKey) ?? "").length > 0;
            if (!accessTokenAuthFlag && accessTokenStorageAccessTokenFlag) {
                accessTokenStorage.setItem(accessTokenKey, accessToken);
                pageLoadingFlag = true;
            }

            const refreshTokenStorageRefreshTokenFlag = (refreshTokenStorage.getItem(refreshTokenKey) ?? "").length > 0;
            if (!refreshTokenAuthFlag && refreshTokenStorageRefreshTokenFlag) {
                refreshTokenStorage.setItem(refreshTokenKey, refreshToken);
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

    return (
        <AppLayout>
            {renderComponent()}
        </AppLayout>
    )
}