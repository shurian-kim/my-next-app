import Link from "next/link";

const NoticeList = (): JSX.Element => {
    return (
        <ul>
            <li>
                <Link
                    href={{
                        pathname: '/notice/detail/[id]',
                        query: { id: '1' },
                    }}
                >
                    <a>Notice 1</a>
                </Link>
            </li>
            <li>
                <Link
                    href={{
                        pathname: '/notice/detail/[id]',
                        query: { id: '2' },
                    }}
                >
                    <a>Notice 2</a>
                </Link>
            </li>
        </ul>
    );
}

export default NoticeList;