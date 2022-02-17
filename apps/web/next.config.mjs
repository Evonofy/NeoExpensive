const isGithubPages = process.env.GH_PAGES === 'true';
const projectName = 'neo-expensive';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  // reactStrictMode: true,
  // compress: true,
  // cleanDistDir: true,
  // optimizeFonts: true,

  experimental: {
    runtime: 'edge',
    serverComponents: true,
    // reactRoot: true,
    // urlImports: ['https://cdn.skypack.dev'],
    concurrentFeatures: true,
  },

  basePath: isGithubPages ? `/${projectName}` : '',
  assetPrefix: isGithubPages ? `/${projectName}/` : '',
};

export default nextConfig;
