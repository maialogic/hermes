import { SignalConstants } from 'os';
import chalk from 'chalk';
import { success } from 'log-symbols';
import express from 'express';
import webpack from 'webpack';

import { devConfig } from './configs/webpack.dev';
import {
  getPort,
  constants,
  setupMiddlewares,
  WebpackOpenBrowser,
} from '$/utils';

const { DEFAULT_PORT, ENABLE_OPEN, HOST } = constants;

async function start(): Promise<void> {
  const PORT = await getPort(HOST, DEFAULT_PORT);
  const DEFAULT_URL = `http://${HOST}:${PORT}`;

  // ENABLE_OPEN parameter could be true or a specified URL
  if (ENABLE_OPEN) {
    let URL = ENABLE_OPEN as string;
    if (ENABLE_OPEN === true) {
      URL = DEFAULT_URL;
      // Both unset and empty string are considered as root path
      const publicPath = devConfig.output?.publicPath || '/';
      if (publicPath !== '/') {
        // Pay attention to handling the case without the '/' prefix and suffix
        URL = `${URL}${publicPath.startsWith('/') ? '' : '/'}${publicPath}${
          publicPath.endsWith('/') ? '' : '/'
        }index.html`;
      }
    }
    devConfig.plugins!.push(new WebpackOpenBrowser({ url: URL }));
  }

  const devServer = express();
  // Load webpack configuration, get compiler
  const compiler = webpack(devConfig);
  setupMiddlewares(devServer, compiler);

  const httpServer = devServer.listen(PORT, HOST, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return;
    }
    // logSymbols.success will be rendered as √ on windows platforms, Linux platforms will display ✔
    // eslint-disable-next-line no-console
    console.log(
      `DevServer is running at ${chalk.magenta.underline(
        DEFAULT_URL,
      )} ${success}`,
    );
  });

  // We use cross-env-shell instead of cross-env therefore listened to node signals.
  // ref：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
  const signals: Array<keyof SignalConstants> = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, () => {
      // First close devServer
      httpServer.close();
      // Randomly output 'See you again' and 'Goodbye' when ctrl + c
      // eslint-disable-next-line no-console
      console.log(
        chalk.greenBright.bold(
          `\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`,
        ),
      );
      // Exit the node process
      process.exit();
    });
  });
}

// People who wrote Python should not be unfamiliar with this way of writing
// require.main === module to determine whether this module is directly run
if (require.main === module) {
  start();
}
