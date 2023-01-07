import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import { parseBody } from 'next/dist/server/api-utils' // node 12
import { parseBody } from "next/dist/server/api-utils/node"; // node 12.2
// import getRowBody from "row-body"
import { useState } from 'react';
import { useEffect } from 'react';

interface serverSideProps {
    requestParam:Object
}

const postRequestTest = (props:serverSideProps) =>{

    const [postPrams, setPostParams] = useState<Object>();

    useEffect(()=>{
        setPostParams(props);
    }, [])

    console.log("postRequestTest props = ", props)
    return (
        <div>
            Post Request param test
            <div>{JSON.stringify(props)}</div>
        </div>
    )
}

export default postRequestTest;

export const getServerSideProps:GetServerSideProps = async (context: GetServerSidePropsContext) =>{

    const method = context.req?.method;
    let requestParam = {}
    
    switch(method){
        case "POST" :
            const body = await parseBody(context.req, '1mb') || {};
            requestParam = body
            break;
        case "GET" :
            requestParam = context.req.cookies;
            break;
    }

    console.log(`[${method}]requestParam ====>>>>> `, requestParam);

    return{
        props:requestParam
    }
}