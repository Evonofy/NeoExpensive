const isGithubPages = process.env.GH_PAGES === 'true';
const projectName = 'neo-expertise';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  cleanDistDir: true,
  optimizeFonts: true,

  basePath: isGithubPages ? `/${projectName}` : '',
  assetPrefix: isGithubPages ? `/${projectName}/` : '',

  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
};

module.exports = nextConfig;
