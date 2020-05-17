import merge from 'webpack-merge';
import { commonConfig } from './webpack.common';

export const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
});
