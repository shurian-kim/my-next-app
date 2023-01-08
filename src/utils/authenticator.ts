import { Router } from "next/router";
import { checkAuthorization } from "src/api/auth/AuthCheck";
import { PublicPathManager } from "./PublicPathManager";
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * 페이지 권한 통과 여부
 * @param router Router
 * @returns 
 */
export const passPageAuth = (router: Router): boolean => {
    const routerPath = router.pathname;

    // 페이지 오류 case
    if (router.route === '/_error') {
        return true;
    }

    // public path
    if (routerPath === '/' || PublicPathManager.path.includes(routerPath)) {
        return true
    }

    return checkAuthorization();
};

export interface alowedOptionsType{
    "origin"?: string[], 
    "methods"?: string[],
    "headers"?: string[]
}

/**
 * request권한을 체크한다
 * @param req request
 * @param res response
 * @example 
 * requestPermitedCheck(req, res)
 * // 401 Unauthorized : 인증(authenticated)에 대한 이야기다 (사용자 인증)
 * // 403 Forbidden : 권한(authorized)에 대한 내용이다. ( 해당 컨텐츠에대한 접근 권한 )
 * // 405 Method Not Allowed : 클라이언트의 요청이 허용되지 않는 메소드인 경우
 */
export const requestPermitedCheck = (req: NextApiRequest, res: NextApiResponse, allowOptions?:alowedOptionsType) : void => {

    const requesMethod = req.method ?? "";
    const requestReferer = req.headers.referer ?? "";
    let requestRefererDomain = "";
    
    const requestDomainMatcher = requestReferer.match(/(^http(s)?:\/\/[a-zA-Z0-9.]+(:([0-9]*))?)/ig);;
    if( requestDomainMatcher !== null ){
        requestRefererDomain = requestDomainMatcher[0];
    }
    console.log('requestReferer : ', requestReferer);
    console.log("requestRefererDomain : ", requestRefererDomain);
    
    const allowedUrls = [...allowOptions?.origin??[], ...['http://localhost:8080', 'https://localhost:8080', 'http://localhost:3000', 'https://localhost:3000']];
    console.log("permittedUrls.includes(requestRefererDomain) : ", allowedUrls.includes(requestRefererDomain));
    
    if(!allowedUrls.includes(requestRefererDomain)){
        res.status(401).send(
            {
                "errors" :{
                    "code": 401,
                    "message": "접근 권한이 없습니다."
                }
            }
        )
        res.end();
    }
    // const requesMethod = req.method === "GET" ? 'PUT' : req.method ?? "";

    console.log(`METHOD : ${requesMethod}`);
    const allowedMethods = allowOptions?.methods??["GET", "HEAD", "POST","PUT", "DELETE"];
    if(!allowedMethods.includes(requesMethod)){
        res.status(405).send(
            {
                "errors" :{
                    "method": requesMethod,
                    "code": 405,
                    "message": "허용되지 않은 요청 메소드 입니다."
                }
            }
        )
        res.end();
    }

}
