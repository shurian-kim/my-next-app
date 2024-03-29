import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import runMiddleware from 'src/middleware/runMiddleare';
import { getQueryString } from 'src/utils/StringUtils';
import { requestPermitedCheck } from 'src/utils/authenticator';
// import { setCookie } from 'src/utils/cookies'
import { logger } from '@/utils/logger';

const cors = Cors({ 
    methods: ['POST', 'GET', 'HEAD'],
    allowedHeaders: ['http://localhost:8080', 'https://localhost:8080', 'http://localhost:3000', 'https://localhost:3000'],
    origin: ['http://localhost:8080', 'https://localhost:8080', 'http://localhost:3000', 'https://localhost:3000']
})

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

    // Run the middleware
    await runMiddleware(req, res, cors);
    // permition check
    requestPermitedCheck(req, res,
        {
            methods: ["POST", "GET"],
            origin: ["https://www.kbstar.com/"]
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
    logger.debug(`[${requesMethod ?? ""}] requestParams : `, requestParams);
    // parameter LOG E

    const redirectUrl = `/requestMapper${getQueryString(req)}`;
    logger.debug("redirectURL = ", redirectUrl);

    // res.status(200).json(requestParams);
    res.status(200).redirect(redirectUrl);
    res.end();
}