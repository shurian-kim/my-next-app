import { Router } from "next/router";
import { checkAuthorization } from "src/api/auth/AuthCheck";

class PublicPathManage {

    #pulbicPath:Array<string> = [
        '/404',
        '/500',
        // "/toDoList"
        // , "/kakao"
        // , "/toDoList"
    ]

    constructor() {

    }

    #getPublicPath():Array<string>{
        return this.#pulbicPath;
    }

    getPath():Array<string>{
        return this.#getPublicPath()
    }

}

/**
 * 페이지 권한 통과 여부
 * @param router Router
 * @returns 
 */
export const passPageAuth = (router: Router) => {
    const routerPath = router.pathname;

    // 페이지 오류 case
    if(router.route === '/_error'){
        return true;
    }

    // public path
    if (routerPath === '/' || new PublicPathManage().getPath().includes(routerPath)) {
        return true
    }

    return checkAuthorization();
};