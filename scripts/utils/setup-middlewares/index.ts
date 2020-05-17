import { Compiler } from 'webpack';
import { Express } from 'express';

// Middlewares
import historyFallback from 'connect-history-api-fallback';
import cors from 'cors';

import { proxyMiddleware } from '../proxy';
import { webpackMiddleware } from '../webpack-middleware';

/**
 * Configure middleware
 */
export function setupMiddlewares(server: Express, compiler: Compiler): void {
  // Set proxy
  proxyMiddleware(server);

  // When using browserRouter, you need to redirect all html pages to the home page
  server.use(historyFallback());

  // You may need to enable cross-domain when developing chrome extensions
  server.use(cors());

  // Webpack related middleware
  server.use(webpackMiddleware(compiler));
}
