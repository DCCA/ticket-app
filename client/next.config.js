module.exports = {
  webpackDevMiddleaware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
