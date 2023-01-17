import AppLayout from "src/components/layout/AppLayout"
import { logger } from '@/utils/logger';

const Login = (props: any): JSX.Element => {
    logger.debug('Login props = ', props)
    return (
        <AppLayout>
            <div>로그인</div>
        </AppLayout>
    )
}

export default Login