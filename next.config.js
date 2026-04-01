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
  async rewrites() {
    return [
      {
        source: '/api/profile/:path*',
        destination: 'http://72.56.106.83:8080/api/profile/:path*',
      },
    ];
  },
};

export default config;