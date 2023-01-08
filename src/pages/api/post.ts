import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import runMiddleware from 'src/middleware/runMiddleare';
// import { setCookie } from 'src/utils/cookies'

const cors = Cors({ methods: ['POST', 'GET', 'HEAD'] })

// declare type Send<T> = (body: T) => void;

const prepParams = function (req: NextApiRequest): string {
    let queryParam = "";
    for (const [key, value] of Object.entries(req.query)) {
        if (queryParam === '')
            queryParam += '?';
        else
            queryParam += '&';
        queryParam += String(key) + '=' + String(value);
    }
    return queryParam;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    // Run the middleware
    await runMiddleware(req, res, cors)

    let requestParams: { param1?: string, param2?: string, param3?: string, param4?: string, param5?: string[] } = {};
    const redirectUrl = "/post";
    switch (req.method) {
        case "POST":
            requestParams = req.body;
            break;
        case "GET":
            requestParams = req.query;

            // res.writeHead(302, { Location: `${redirectUrl}${prepParams(req)}` });
            // res.end();
            break;
    }

    console.log(`[${req.method ?? ""}] requestParams : `, requestParams);
    console.log("redirectURL = ", redirectUrl);
    console.log("queryURL = ", `${redirectUrl}${prepParams(req)}`);

    res.setHeader("Content-Type", "application/json")
    // res.status(200).json(requestParams);
    res.status(200).redirect(redirectUrl);

    // return await new Promise(() => { res.status(200).json(requestParams); });
}