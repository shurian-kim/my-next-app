/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import { parseBody } from 'next/dist/server/api-utils' // node 12
import { parseBody } from "next/dist/server/api-utils/node"; // node 12.2
import { useRouter } from 'next/router';
// import getRowBody from "row-body"
import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';

interface serverSideProps {
    method: string
    requestParams: unknown
}

const postRequestTest = (props: serverSideProps): JSX.Element => {

    const [postPrams, setPostParams] = useState<unknown>();
    const router = useRouter();

    useEffect(()=>{
        logger.debug('router.query => ', router.query);
    },[router.query])

    useEffect(() => {
        if (typeof props !== "undefined") {
            logger.debug("setPostParams >>>>>>>>>>>>>>")
            setPostParams(props);
        }
    }, [props]);

    useEffect(() => {
        if (typeof postPrams !== "undefined") {
            logger.debug("postRequestTest props = ", postPrams);
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
        logger.debug('catch requestParam : ', requestParam);
    }

    logger.debug(`[${method}]requestParam ====>>>>> `, requestParam);

    return {
        props: {
            method,
            requestParam
        }
    }
}