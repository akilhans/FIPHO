import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/register", destination: "https://register-fipho.olympcenter.uz/registration", permanent: false },
      { source: "/past-arbicho", destination: "/past-fipho", permanent: true },
      { source: "/future-arbicho", destination: "/future-fipho", permanent: true },
      { source: "/arbicho-sponsors", destination: "/fipho-sponsors", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
    ];
  },
};

export default nextConfig;
