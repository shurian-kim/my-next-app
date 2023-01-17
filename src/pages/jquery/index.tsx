import Script from "next/script"
import { useEffect, useState } from "react"
import AppLayout from "src/components/layout/AppLayout"
import { logger } from '@/utils/logger';

const JqueryTest = (): JSX.Element => {

    const [cloneHtml, setCloleHtml] = useState<string>('')

    const initJquery = (): void => {
        logger.debug(`initJquery window.jQuery = `, window.jQuery)
        setCloleHtml(window.jQuery('#jQueryTest').html())
    }

    const jqTest = (): void => {
        setCloleHtml(`${window.jQuery('#jQueryTest').html() as string} Click!!`);

    }

    useEffect(() => {
        logger.debug(`window = `, window)
        logger.debug(`useEffect window.jQuery =`, window.jQuery)
    }, [])

    return (
        <AppLayout>
            <Script src="https://code.jquery.com/jquery-3.6.1.min.js" onLoad={initJquery}></Script>
            <div id="jQueryTest" onClick={jqTest}>제이쿼리 테스트</div>
            <div>{cloneHtml}</div>
        </AppLayout>
    )
}

export default JqueryTest


