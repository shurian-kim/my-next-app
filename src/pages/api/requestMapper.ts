import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import runMiddleware from 'src/middleware/runMiddleare';
import {getQueryString} from 'src/utils/StringUtils';
import {requestPermitedCheck} from 'src/utils/authenticator';
// import { setCookie } from 'src/utils/cookies'

const cors = Cors({ methods: ['POST', 'GET', 'HEAD'] })

export default async function handler(req: NextApiRequest,res: NextApiResponse): Promise<void> {

    // Run the middleware
    await runMiddleware(req, res, cors);
    // permition check
    requestPermitedCheck(req, res,  
        {
            methods : ["POST", "GET"],
            origin : ["https://www.kbstar.com/"]
        }
    );
    
    // res.setHeader("Content-Type", "application/json")
    const requesMethod = req.method ?? "";

    // parameter LOG S
    let requestParams: { 
        param1?: string, 
        param2?: string, 
        param3?: string, 
        param4?: string, 
        param5?: string[] 
    } = {};
    
    switch (requesMethod) {
        case "POST":
            requestParams = req.body;
            break;
        case "GET":
            requestParams = req.query;
            break;
    }
    console.log(`[${requesMethod ?? ""}] requestParams : `, requestParams);
    // parameter LOG E

    const redirectUrl = `/requestMapper${getQueryString(req)}`;
    console.log("redirectURL = ", redirectUrl);

    // res.status(200).json(requestParams);
    res.status(200).redirect(redirectUrl);
    res.end();
}