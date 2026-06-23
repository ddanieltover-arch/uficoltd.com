import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uficoltd.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/161-2", destination: "/manufacturing-process", permanent: true },
      { source: "/26-2", destination: "/", permanent: true },
      { source: "/cart", destination: "/shop", permanent: true },
      { source: "/checkout", destination: "/contact-us", permanent: true },
      { source: "/my-account", destination: "/contact-us", permanent: true },
      {
        source: "/product-category/:slug",
        has: [{ type: "query", key: "product_cat" }],
        destination: "/product-category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
