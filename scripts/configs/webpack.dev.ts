import merge from 'webpack-merge';
import { commonConfig } from './webpack.common';

export const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
});
