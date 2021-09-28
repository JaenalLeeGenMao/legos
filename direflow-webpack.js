const { webpackConfig } = require('direflow-scripts');
const Dotenv = require('dotenv-webpack');
/**
 * Webpack configuration for Direflow Component
 * Additional webpack plugins / overrides can be provided here
 */
module.exports = (config, env) => {
  const buildInWebpackConfig = webpackConfig(config, env);
  buildInWebpackConfig.plugins[3] = new Dotenv(); /** overwrite into our custom ENV */
  return {
    ...buildInWebpackConfig,
    plugins: [
      ...buildInWebpackConfig.plugins
    ]
  }
};
