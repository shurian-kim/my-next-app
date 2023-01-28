import { AppProps } from 'next/app'
import AppLayout from 'src/components/layout/AppLayout'
import { AuthContext, IAuthContext } from "@/components/auth/AuthComponentProvidor";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginProcess = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { accessToken, setAccessToken, setRefreshToken } = useContext<IAuthContext>(AuthContext);

    const router = useRouter();
    const redirectUrl = router.query?.redirectUrl as string ?? "";

    useEffect(() => {
        setAccessToken("Bearer AWS4-HMAC-SHA256");
        setRefreshToken("Bearer Refresh-AWS4-HMAC-SHA256");
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
                : <>로그인 실패 ㅠㅠ</>
            }
        </AppLayout>
    )
}

export default LoginProcess;