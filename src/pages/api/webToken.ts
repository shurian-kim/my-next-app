import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtUtil, JwtTokenType } from 'modules/jwt/jwtUtil'
import { logger } from '@/utils/logger';
import { setCookie } from '@/utils/cookies';

logger.setInstanceName("webToken API");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<JwtTokenType>,
): Promise<void> {

    let remoteAddress = "";

    logger.debug('referer : ', req?.headers.referer);
    logger.debug('host : ', req?.headers.host);

    if (typeof req?.headers !== "undefined") {
        if (typeof req.headers['x-real-ip'] !== "undefined") {
            remoteAddress = req.headers['x-real-ip'] as string;
        } else if (typeof req.headers['x-forwarded-for'] !== "undefined") {
            remoteAddress = req.headers['x-forwarded-for'] as string;
        } else if (req?.socket?.remoteAddress !== null) {
            remoteAddress = req?.socket?.remoteAddress ?? "";
        } else {
            remoteAddress = req?.headers.host ?? "";
        }
    }

    logger.debug("remoteAddress : ", remoteAddress);

    const jwtToken = await jwtUtil.sign({ userIdx: 1, email: "kdj@mail.com", remoteAddress });

    res.setHeader('Authorization', `Bearer ${jwtToken.accessToken}`);

    setCookie(res, "token", jwtToken, {});
    // res.setHeader('Set-Cookie', `accessToken=${jwtToken.accessToken}; refreshToken=${jwtToken.refreshToken} path=/;`);

    res.status(200).json({ accessToken: jwtToken.accessToken, refreshToken: jwtToken.refreshToken })
}