// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  pwa: {
    dest: '/',
    swSrc: 'service-worker.js',
  },
  images: {
    loader: 'custom',
    path: '',
    domains: ['cdn.itaphoa.com', 'mio-app-dev.s3.ap-southeast-1.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
  // compiler: {
  //   removeConsole: true,
  // },
  nx: {
    pwa: {
      dest: 'public',
      swSrc: 'service-worker.js',
    },
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
    swcMinify: true,
    experimental: {
      urlImports: ['https://cdn.skypack.dev'],
      outputStandalone: true,
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      });

      // config.module.rules.push({
      //   test: /\.svg$/,
      //   issuer: {
      //     test: /\.(js|ts)x?$/,
      //     // for webpack 5 use
      //     // { and: [/\.(js|ts)x?$/] }
      //   },

      //   use: ['@svgr/webpack'],
      // });
      return config;
    },
  },
};

module.exports = withNx(withPWA(nextConfig));
