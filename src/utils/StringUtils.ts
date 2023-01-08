import { NextApiRequest } from 'next';

/**
 * request.query를 분해해서 queryString만들어준다
 * @param req request
 * @returns string
 */
export const getQueryString = (req: NextApiRequest): string => {
    let queryParam = "";
    let objIdx = 0;
    for (const [key, value] of Object.entries(req.query)) {
        if (queryParam === ''){
            queryParam += '?';
        }
        else{
            queryParam += '&';
        }

        if(typeof value === "object"){
            objIdx = 0;
            for(const arryValue of value){
                if(objIdx>0){
                    queryParam += "&";
                }
                queryParam += encodeURI(String(key)) + '=' +  encodeURI(String(arryValue));
                objIdx++;
            }

        }else{
            queryParam += encodeURI(String(key)) + '=' + encodeURI(String(value));
        }
    }
    return queryParam;
}