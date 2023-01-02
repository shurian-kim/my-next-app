import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import { parseBody } from 'next/dist/server/api-utils' // node 12
import { parseBody } from "next/dist/server/api-utils/node"; // node 12.2
// import getRowBody from "row-body"
import { useState } from 'react';
import { useEffect } from 'react';

interface serverSideProps {
    requestBody:Object
}

const postRequestTest = (props:serverSideProps) =>{

    const [postPrams, setPostParams] = useState<Object>();

    useEffect(()=>{
        setPostParams(props.requestBody);
    }, [])

    console.log("postRequestTest props = ", )
    return (
        <div>
            Post Request param test
            <div>{JSON.stringify(postPrams)}</div>
        </div>
    )
}

export default postRequestTest;

export const getServerSideProps:GetServerSideProps = async (context) =>{

    const body = await parseBody(context.req, '1mb') || {};

    console.log('body ====>>>>> ', body)

    return{
        props:{requestBody : body}
    }
}