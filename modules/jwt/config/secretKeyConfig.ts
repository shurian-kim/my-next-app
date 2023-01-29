
import { SignOptions } from 'jsonwebtoken'

export const secretKeyConfig: { secretKey: string, option: SignOptions } = {
    secretKey: process.env.JWT_TOKEN_SECRET_KEY ?? "", // 원하는 시크릿키
    option: {
        algorithm: "HS256", // 해싱 알고리즘
        expiresIn: "30m",  // 토큰 유효 기간
        issuer: "issuer" // 발행자
    }
}