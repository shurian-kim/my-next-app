import AppLayout from "src/components/layout/AppLayout"
import { logger } from '@/utils/logger';
import { useContext, useEffect } from "react"
import { AuthContext } from "@/pages/_app";

const Logout = (props: any): JSX.Element => {
    logger.debug('Logout props = ', props);

    const { setRemoveToken, setAccessToken, setRefreshToken } = useContext(AuthContext);

    useEffect(() => {
        logger.debug(`${typeof setRemoveToken} !== "undefined"`)
        if (typeof setRemoveToken !== "undefined"
            && typeof setAccessToken !== "undefined"
            && typeof setRefreshToken !== "undefined") {
            setRemoveToken(true);
            setAccessToken("");
            setRefreshToken("");
        }
    }, [])
    return (
        <AppLayout>
            <div>로그아웃</div>
        </AppLayout>
    )
}

export default Logout