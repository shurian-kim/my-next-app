import Script from 'next/script';
import { logger } from '@/utils/logger';

export default function KakaoTest(): JSX.Element {

    function kakaoInit(): void { // 페이지가 로드되면 실행
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        logger.debug(window.Kakao.isInitialized());
    }
    return (
        <>
            <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit}></Script>
            <div>카카오!!!!!</div>
        </>
    )
}