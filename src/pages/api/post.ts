import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import runMiddleware from 'src/middleware/runMiddleare';

const cors = Cors({ methods: ['POST', 'GET', 'HEAD'] })

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    let requestParams = {};
    switch(req.method){
        case "POST" :
            requestParams = req.body;
            break;
        case "GET" :
            requestParams = req.query;
            break;
    }

    console.log(`[${req.method}] requestParams : `, requestParams);

    res.status(200).redirect('/post');
}