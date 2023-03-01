import { logger } from '@/utils/logger';
import { useContext, useEffect } from "react"
import { AuthContext } from "modules/auth/AuthComponentProvidor";
import { useRouter } from 'next/router';

const Logout = (props: any): JSX.Element => {
    logger.debug('Logout props = ', props);

    const { setRemoveToken, setAccessToken, setRefreshToken } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        setRemoveToken(true);
        setAccessToken("");
        setRefreshToken("");
        void router.replace("/");
    }, [router, setAccessToken, setRefreshToken, setRemoveToken])
    return (
        <div>로그아웃</div>
    )
}

export default Logout