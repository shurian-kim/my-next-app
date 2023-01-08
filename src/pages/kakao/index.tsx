import Script from 'next/script';
import AppLayout from 'src/components/layout/AppLayout';

export default function KakaoTest(): JSX.Element {

    function kakaoInit(): void { // 페이지가 로드되면 실행
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log(window.Kakao.isInitialized());
    }
    return (
        <AppLayout>
            <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit}></Script>
            <div>카카오!!!!!</div>
        </AppLayout>
    )
}