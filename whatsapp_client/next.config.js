/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1441386334,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "8e4e1dfc8d37c5c233dfab9fcdd4e59e",
  },
  images: {
    domains: ["lh3.googleusercontent.com", "localhost"],
  },
};

module.exports = nextConfig;
