module.exports = function override(config) {
  config.module.rules.push({
    test: /node_modules[\\|/]colorbrewer/,
    use: { loader: 'umd-compat-loader?amd=true' },
  });
  return config;
};
