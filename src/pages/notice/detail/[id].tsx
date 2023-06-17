import { useRouter } from "next/router";
import { Button, Heading, VStack } from '@chakra-ui/react';

const NoticeDetail = (): JSX.Element => {

    const router = useRouter();

    return (
        <VStack>
            <Heading>
                게시판 상세 ID : {router?.query?.id}
            </Heading>
            <Button onClick={() => { void router.push("/notice/list"); return false; }}>목록으로</Button>
        </VStack>
    );
}

export default NoticeDetail;