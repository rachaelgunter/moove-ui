const webpack = require('webpack');
const env = require('dotenv');

env.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

module.exports = function override(config) {
  config.module.rules.push({
    test: /node_modules[\\|/]colorbrewer/,
    use: { loader: 'umd-compat-loader?amd=true' },
  });

  config.plugins.push(
    new webpack.EnvironmentPlugin([
      'REACT_APP_AUTH0_DOMAIN',
      'REACT_APP_AUTH0_CLIENT_ID',
      'REACT_APP_AUTH0_AUDIENCE',
      'REACT_APP_ROAD_IQ_URL',
      'REACT_APP_AUTH0_CLAIMS_NAMESPACE',
      'REACT_APP_MAPBOX_TOKEN',
      'REACT_APP_GRAPHQL_API',
      'REACT_APP_AUTH0_REDIRECT_URI',
      'REACT_APP_AUTH0_LOGOUT_REDIRECT_URI',
      'REACT_APP_JUPYTERHUB_URL',
      'REACT_APP_DATASET_ASSETS_BUCKET',
    ]),
  );

  return config;
};
