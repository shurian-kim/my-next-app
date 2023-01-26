import { AppProps } from 'next/app'
import AppLayout from 'src/components/layout/AppLayout'
import { AuthContext } from "@/pages/_app";
import { useContext, useEffect } from 'react';

const LoginProcess = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { accessToken, setAccessToken } = useContext(AuthContext);

    useEffect(() => {
        if (typeof setAccessToken !== "undefined") {
            setAccessToken("Bearer AWS4-HMAC-SHA256");
        }
    }, [setAccessToken])

    return (
        <AppLayout>
            로그인 성공 토큰 : {accessToken}
        </AppLayout>
    )
}

export default LoginProcess;