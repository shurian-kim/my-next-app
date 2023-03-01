/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  poweredByHeader:false,
  compiler:{
    removeConsole:{ // console.log 제거 옵션
      exclude: ['error'],
    }
  },
  images: {
    domains: ['c:'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //     port: '',
    //     pathname: '/account123/**',
    //   },
    // ],
  },
  // "distDir": "build",
  // "exportTrailingSlash": true,
  // "assetPrefix": "https://~~~"
}

const initNextConfig = () =>{

  if(process.env.NODE_ENV !== 'production'){
    nextConfig.compiler.removeConsole = false;
  }

  // console.log(`nextConfig = `, nextConfig);
  
  return nextConfig;
}

module.exports = initNextConfig();
