import Link from "next/link"
import React, { useState } from "react"
import AppLayout from "src/components/layout/AppLayout"

function Hello() {
    const [cnt, setCnt] = useState<number>(1)

    const increaseCnt = (increaseCnt: number) => {
        setCnt(cnt + increaseCnt)
    }

    const initCnt = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCnt(1)
    }
    return (
        <AppLayout>
            <div style={{ margin: '10px' }}>
                <div>Hello</div>
                <input type="text" id="cnt" className="inputCss" value={cnt} readOnly />
                <button id="btn" className="btnCss" style={{ marginLeft: '10px' }} onClick={event => { increaseCnt(2) }}>카운트 해보자!!</button>
                <button id="btnInit" className="btnCssInit" style={{ marginLeft: '10px' }} onClick={initCnt}>초기화!!</button>
                <div>
                    <Link href={"About"}>
                        About Go!!
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}

export default Hello