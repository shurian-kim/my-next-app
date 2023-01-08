// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  res.setHeader('Authorization', `Bearer ${Math.random()}`)
  res.status(200).json({ name: 'John Doe' })
}
