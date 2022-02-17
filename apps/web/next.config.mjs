const isGithubPages = process.env.GH_PAGES === 'true';
const projectName = 'neo-expensive';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  cleanDistDir: true,
  optimizeFonts: true,

  basePath: isGithubPages ? `/${projectName}` : '',
  assetPrefix: isGithubPages ? `/${projectName}/` : '',
};

export default nextConfig;
