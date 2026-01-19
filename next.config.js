/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // IMPORTANT for GitHub Pages repo deployment
  basePath: "/F1",
  assetPrefix: "/F1/",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
