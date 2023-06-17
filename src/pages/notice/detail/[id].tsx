import { useRouter } from "next/router";

const NoticeDetail = (): JSX.Element => {

    const router = useRouter();

    return (
        <div>
            게시판 상세 ID : {router?.query?.id}
        </div>
    );
}

export default NoticeDetail;