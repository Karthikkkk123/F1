/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "export",

  // IMPORTANT for GitHub Pages repo deployment
  // Only set basePath/assetPrefix in production to avoid 404s during local dev
  ...(isProd
    ? {
        basePath: "/F1",
        assetPrefix: "/F1/",
      }
    : {}),

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
