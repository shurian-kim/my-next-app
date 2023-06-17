import { logger } from '@/utils/logger';
import { useRouter } from 'next/router';
import { Button, Flex, Heading } from '@chakra-ui/react';

const Login = (props?: any): JSX.Element => {
    logger.debug('Login props = ', props);

    const router = useRouter();

    const goLogin = (): void => {

        void router.push({
            pathname: "/login/loginProcess",
            query: { redirectUrl: props?.redirectUrl }
        }, "/login/loginProcess");
    }
    return (
        <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Flex direction={"column"} background={"gray.100"} p={12} rounded={6}>
                <Heading mb={6}>로그인</Heading>
                <Button colorScheme='blue' size={"lg"} onClick={goLogin}>
                    Log in
                </Button>
            </Flex>
        </Flex>
    )
}

export default Login