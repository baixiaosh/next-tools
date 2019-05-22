const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withTypescript, withCss, withLess], {
    webpack(config, options) {
        return config;
    },
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    poweredByHeader: false
});
