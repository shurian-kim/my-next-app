import Script from "next/script"
import { useEffect, useState } from "react"

const JqueryTest = () => {

    const [cloneHtml, setCloleHtml] = useState<string>('')

    const initJquery = () => {
        console.log(`initJquery window.jQuery = `, window.jQuery)
        setCloleHtml(window.jQuery('#jQueryTest').html())
    }

    const jqTest = () => {

        setCloleHtml(window.jQuery('#jQueryTest').html() + ' Click!!')

    }

    useEffect(()=>{
        console.log(`window = `, window)
        console.log(`useEffect window.jQuery = ${window.jQuery}`)
    },[])

    return (
        <div>
            <Script src="https://code.jquery.com/jquery-3.6.1.min.js" onLoad={initJquery}></Script>
            <div id="jQueryTest" onClick={jqTest}>제이쿼리 테스트</div>
            <div>{cloneHtml}</div>
        </div>
    )
}

export default JqueryTest


