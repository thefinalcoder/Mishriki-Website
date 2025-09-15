import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for custom domain
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/mishriki-redesign' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/mishriki-redesign' : '',
};

export default nextConfig;
