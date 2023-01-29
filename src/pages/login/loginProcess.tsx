import { AppProps } from 'next/app'
import AppLayout from 'src/components/layout/AppLayout'
import { AuthContext, IAuthContext } from "modules/auth/AuthComponentProvidor";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import apiService from '@/api/axios/api'
import { JwtTokenType } from 'modules/jwt/jwtUtil'
import { logger } from '@/utils/logger';

const LoginProcess = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { accessToken, setAccessToken, setRefreshToken } = useContext<IAuthContext>(AuthContext);

    const router = useRouter();
    const redirectUrl = router.query?.redirectUrl as string ?? "";

    useEffect(() => {

        apiService.post('/api/webToken').then((response)=>{

            const tokenInfo:JwtTokenType = response.data;

            // logger.debug('/api/webToken tokenInfo.accessToken : ', tokenInfo.accessToken);
            // logger.debug('/api/webToken tokenInfo.refreshToken : ', tokenInfo.refreshToken);

            setAccessToken(tokenInfo.accessToken);
            setRefreshToken(tokenInfo.refreshToken);
        }).catch((error:any)=>{
            logger.error(error);
        });

    }, [setAccessToken, setRefreshToken]);

    return (
        <AppLayout>
            {accessToken?.length > 0 ? (
                <>
                    {pageProps}
                    <div>
                        로그인 성공 토큰 : {accessToken}
                    </div>
                    {redirectUrl.length > 0 ? (
                        <div style={{ "marginTop": "10px" }}>
                            <Link href={{ pathname: redirectUrl }}>페이지 이동 (☞ﾟヮﾟ)☞</Link>
                        </div>
                    )
                        : null
                    }
                </>
            )
                : <>로그인중입니다...</>
            }
        </AppLayout>
    )
}

export default LoginProcess;