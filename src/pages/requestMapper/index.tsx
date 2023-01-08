/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import { parseBody } from 'next/dist/server/api-utils' // node 12
import { parseBody } from "next/dist/server/api-utils/node"; // node 12.2
// import getRowBody from "row-body"
import { useState, useEffect } from 'react';

interface serverSideProps {
    method: string
    requestParams: unknown
}

const postRequestTest = (props: serverSideProps): JSX.Element => {

    const [postPrams, setPostParams] = useState<unknown>();

    useEffect(() => {
        if (typeof props !== "undefined") {
            console.log("setPostParams >>>>>>>>>>>>>>")
            setPostParams(props);
        }
    }, [props]);

    useEffect(() => {
        if (typeof postPrams !== "undefined") {
            console.log("postRequestTest props = ", postPrams);
        }
    }, [postPrams])

    return (
        <div>
            Post Request param test
            <div>{JSON.stringify(props)}</div>
        </div>
    )
}

export default postRequestTest;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const method = context.req?.method ?? "";
    let requestParam: any = {}

    try {
        switch (method) {
            case "POST":
                requestParam = await parseBody(context.req, '1mb');
                break;
            case "GET":
                requestParam = context.query ?? {};
                break;
        }
    } catch (e) {
        console.error(e);
        requestParam = await parseBody(context.req, '1mb');
        console.log('catch requestParam : ', requestParam);
    }

    console.log(`[${method}]requestParam ====>>>>> `, requestParam);

    return {
        props: {
            method,
            requestParam
        }
    }
}