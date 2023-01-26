import Script from "next/script"
import { useEffect, useState } from "react"
import AppLayout from "src/components/layout/AppLayout"
import { logger } from '@/utils/logger';

const JqueryTest = (): JSX.Element => {

    const [cloneHtml, setCloleHtml] = useState<string>('');
    const [jqueryInitFlag, setJqueryInitFlag] = useState<boolean>(false);

    const initJquery = (): void => {
        logger.debug("init!!! jquery!!!");
        setJqueryInitFlag(true);
    }

    useEffect(() => {
        if (jqueryInitFlag) {
            logger.debug(`jqueryInitFlag = `, jqueryInitFlag);
            setCloleHtml(window.jQuery('#jQueryTest').html());
        }
    }, [jqueryInitFlag])

    const jqTest = (): void => {
        setCloleHtml(`${window.jQuery('#jQueryTest').html() as string} Click!!`);
    }

    useEffect(() => {
        logger.debug(`window = `, window)
        logger.debug(`useEffect window.jQuery =`, window.jQuery)
    }, [])

    return (
        <AppLayout>
            <Script strategy="afterInteractive" src="https://code.jquery.com/jquery-3.6.1.min.js" onLoad={initJquery} />
            <div id="jQueryTest" onClick={jqTest}>제이쿼리 테스트</div>
            <div>{cloneHtml}</div>
        </AppLayout>
    )
}

export default JqueryTest


