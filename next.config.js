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
      // Добавляем поддержку изображений от TMDB
      {
  protocol: "https",
  hostname: "image.tmdb.org",
  pathname: "**", // Разрешаем всё для теста
},
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/profile/:path*',
        destination: 'http://72.56.106.83:8080/api/profile/:path*',
      },
      // Добавляем прокси для рецензий
      {
        source: '/api/reviews/:path*',
        destination: 'http://72.56.106.83:8080/api/reviews/:path*',
      },
    ];
  },
};

export default config;