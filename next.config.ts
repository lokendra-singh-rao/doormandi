import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ditansource-dev-chat-dev.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
