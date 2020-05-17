import chalk from 'chalk';
import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { proxyTable } from './proxy-table';

function link(str: string): string {
  return chalk.magenta.underline(str);
}

export function proxyMiddleware(server: Express): void {
  Object.entries(proxyTable).forEach(([path, options]) => {
    const from = path;
    const to = options.target as string;
    // eslint-disable-next-line no-console
    console.log(`proxy ${link(from)} ${chalk.green('->')} ${link(to)}`);

    // eslint-disable-next-line no-param-reassign
    if (!options.logLevel) options.logLevel = 'warn';
    server.use(path, createProxyMiddleware(options));
  });
  process.stdout.write('\n');
}
