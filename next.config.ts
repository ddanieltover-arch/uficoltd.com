import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uficoltd.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/161-2", destination: "/manufacturing-process", permanent: true },
      { source: "/26-2", destination: "/", permanent: true },
      { source: "/cart", destination: "/shop", permanent: true },
      { source: "/checkout", destination: "/contact-us", permanent: true },
      { source: "/my-account", destination: "/contact-us", permanent: true },
      {
        source: "/product/icumsa-100-150-sugar-2",
        destination: "/product/icumsa-100-150-sugar",
        permanent: true,
      },
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
