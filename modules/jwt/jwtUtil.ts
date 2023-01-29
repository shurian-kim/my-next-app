import randToken from 'rand-token';
import jwt from 'jsonwebtoken';
import { secretKeyConfig } from './config/secretKeyConfig';
import { logger } from './utils/logger';

logger.setInstanceName("jwtUtil");
logger.setLogLevel("info");

const secretKey = secretKeyConfig.secretKey;
const options = secretKeyConfig.option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export declare interface JwtTokenType {
    accessToken: string;
    refreshToken: string;
}

export const jwtUtil = {
    sign: async (user: { remoteAddress: string, userIdx: number, email: string }): Promise<JwtTokenType> => {
        /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
        const payload = {
            idx: user.userIdx,
            email: user.email,
            remoteAddress: user.remoteAddress,
        };
        const result: JwtTokenType = {
            // sign메소드를 통해 access token 발급!
            accessToken: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: async (token: string) => {
        let decoded;

        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, secretKey);
        } catch (error: any) {

            if (error.message === 'jwt expired') {
                logger.error('expired token');
                return TOKEN_EXPIRED;
            } else if (error.message === 'invalid token') {
                logger.error('invalid token');
                logger.error(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                logger.error("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}