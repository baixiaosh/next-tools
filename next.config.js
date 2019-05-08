const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');

module.exports = withTypescript(
    withLess({
        webpack(config, options) {
            return config;
        },
        lessLoaderOptions: {
            javascriptEnabled: true
        }
    })
);
