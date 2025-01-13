import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: "20mb", // 요청 본문 크기 제한을 5MB로 설정
    },
  },
};

export default nextConfig;
