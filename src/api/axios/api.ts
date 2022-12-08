import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${Math.random()}` },
    proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 8080,
        // auth: {
        //     username: 'mikeymike',
        //     password: 'rapunz3l'
        // }
    },
});

const _ACCESS_TOCKEN = process.env.NEXT_PUBLIC_ACCESS_TOCKEN || '';

// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행

    const accessTockerValue = localStorage.getItem(_ACCESS_TOCKEN);
    console.log('localStoreage getItem accessTockerValue = ', accessTockerValue);
    
    instance.defaults.headers.common['Authorization'] = accessTockerValue;
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행

    const accessTockenValue = `Bearer ${response.headers?.Authorization || ''}`;
    console.log('response accessTockenValue = ', accessTockenValue);

    localStorage.setItem(_ACCESS_TOCKEN || '', accessTockenValue);

    return response;
}, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
});

export default instance;