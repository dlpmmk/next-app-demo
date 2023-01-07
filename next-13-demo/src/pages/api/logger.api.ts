// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import anylogger from 'anylogger';
import '../../atoms/logger';

const logger = anylogger('pages/api/home/logger.api');


type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    logger.debug(req.body)
    res.status(200).json({ name: 'John Doe' })
}
