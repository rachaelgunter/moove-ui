const webpack = require('webpack');
const env = require('dotenv');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const { aliasJest, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json')

env.config({
  path: `./.env.${process.env.ENV_FILE}`,
});

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /node_modules[\\|/]colorbrewer/,
    use: { loader: 'umd-compat-loader?amd=true' },
  });

  config.plugins.push(
    new webpack.EnvironmentPlugin(Object.keys(process.env).filter(key => key.indexOf('REACT_APP_') === 0)),
  );

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      cesium$: 'cesium/Cesium',
      cesium: 'cesium/Source'
    }
  }
  // //
  const cesiumSource = "node_modules/cesium/Source";
  const cesiumWorkers = "../Build/Cesium/Workers";
  const prod = env === "production";

  config.plugins.push(new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(cesiumSource, cesiumWorkers),
        to: "static/cesium/Workers",
      },
      {
        from: path.join(cesiumSource, "Assets"),
        to: "static/cesium/Assets",
      },
      {
        from: path.join(cesiumSource, "Widgets"),
        to: "static/cesium/Widgets",
      },
    ],
  }));

  config.plugins.push(
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify(process.env.CESIUM_BASE_URL),
    }),
  )

  config.module.rules = [
    ...config.module.rules,
    ...[
      prod
        ? {
          // Strip cesium pragmas
          test: /\.js$/,
          enforce: "pre",
          include: path.resolve(__dirname, cesiumSource),
          use: [
            {
              loader: "strip-pragma-loader",
              options: {
                pragmas: {
                  debug: false,
                },
              },
            },
          ],
        }
        : {},
    ]
  ];

  // https://github.com/CesiumGS/cesium/issues/4876
  config.output = {
    ...config.output,
    ...{sourcePrefix: ''}
  };
  config.module['unknownContextCritical'] = false;

  return config;
};

module.exports.jest = aliasJest(aliasMap)
