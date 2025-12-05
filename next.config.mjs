/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '10mb', // increase to 10 MB (you can set higher)
  },
};

export default nextConfig;
