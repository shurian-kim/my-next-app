import Script from "next/script"
import { useEffect, useState } from "react"
import AppLayout from "src/components/layout/AppLayout"
import { logger } from '@/utils/logger';

const JqueryTest = (): JSX.Element => {

    const [cloneHtml, setCloleHtml] = useState<string>('');
    const [jQueryLoadFlag, setJqueryLoadFlag] = useState<boolean>(false);

    useEffect(()=>{

        // jquery load test
        const jqueryLoadInterval = setInterval(()=>{
            if(typeof window?.jQuery !== "undefined"){
                clearInterval(jqueryLoadInterval);
                setJqueryLoadFlag(true);
            }
        }, 100);

    }, [])

    useEffect(()=>{
        if(jQueryLoadFlag){
            logger.debug("jQuery Load completed : ", window.jQuery);
            setCloleHtml(window.jQuery('#jQueryTest').html());
        }
    },[jQueryLoadFlag])

    const jqTest = (): void => {
        setCloleHtml(`${window.jQuery('#jQueryTest').html() as string} Click!!`);
    }

    return (
        <AppLayout>
            <Script strategy="afterInteractive" src="https://code.jquery.com/jquery-3.6.1.min.js" />
            <div id="jQueryTest" onClick={jqTest}>제이쿼리 테스트</div>
            <div>{cloneHtml}</div>
        </AppLayout>
    )
}

export default JqueryTest


