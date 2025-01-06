import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['loremflickr.com', 'i.pinimg.com', 'id.pinterest.com'],
  },
  /* config options here */
  reactStrictMode: true,

};

export default nextConfig;
