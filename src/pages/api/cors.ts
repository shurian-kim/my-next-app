import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import runMiddleware from 'src/middleware/runMiddleare';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Run the middleware
  await runMiddleware(req, res, cors)

  let requestParams = {};

  switch (req.method) {
    case "POST":
      requestParams = req.body;
      break;
    case "GET":
      requestParams = req.query;
      break;
  }

  console.log(`[${req.method ?? ""}] requestParams : `, requestParams);

  // Rest of the API logic
  res.json({ message: requestParams })
}