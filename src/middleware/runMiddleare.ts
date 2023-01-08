import type { NextApiRequest, NextApiResponse } from 'next'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: any) => void) => void
): Promise<unknown> => {

  const rtnValue = await new Promise(
    (resolve, reject): void => {
      fn(req, res, (result: any): void => {
        if (result instanceof Error) {
          reject(result);
          return;
        }

        resolve(result);
      }
      );
    }
  )

  return rtnValue
}

export default runMiddleware;