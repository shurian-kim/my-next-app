import { logger } from '@/utils/logger';
import Link from 'next/link';

const Login = (props?: any): JSX.Element => {
    logger.debug('Login props = ', props);
    return (
        <>
            <div>로그인 페이지</div>
            <Link
                href={{
                    pathname: "/login/loginProcess",
                    query: { redirectUrl: props?.redirectUrl }
                }} as={"/login/loginProcess"}
            >Login</Link>
        </>
    )
}

export default Login