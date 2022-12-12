import { Router } from "next/router";
import { checkAuthorization } from "src/api/auth/AuthCheck";
import { PublicPathManager } from "./PublicPathManager";

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
    if (routerPath === '/' || PublicPathManager.path.includes(routerPath)) {
        return true
    }

    return checkAuthorization();
};