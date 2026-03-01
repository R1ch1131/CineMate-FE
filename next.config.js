import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "72.56.106.83",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
};

export default config;