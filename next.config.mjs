/** @type {import('next').NextConfig} */
const nextConfig = {
    // for conversations page defult open
    async redirects(){
        return [
            {
                source:'/',
                destination:'/conversations',
                permanent:true
            }
        ]
    }
};

export default nextConfig;
