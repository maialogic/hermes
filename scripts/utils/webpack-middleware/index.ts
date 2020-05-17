import { Compiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { devConfig } from '$/configs/webpack.dev';
import constants from '../constants';

const { HMR_PATH } = constants;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function webpackMiddleware(compiler: Compiler) {
  const publicPath = devConfig.output!.publicPath!;

  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    // Keep the same configuration as in webpack
    publicPath,
    // Only return output when an error occurs or when there is a new compilation
    stats: 'minimal',
    // It can be opened when need to write output files to disk.
    // writeToDisk: true
  };

  const hotMiddlewareOptions: webpackHotMiddleware.MiddlewareOptions = {
    // sse routing
    path: HMR_PATH,
  };

  return [
    webpackDevMiddleware(compiler, devMiddlewareOptions),
    webpackHotMiddleware(compiler, hotMiddlewareOptions),
  ];
}
