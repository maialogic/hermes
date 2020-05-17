import { Options } from 'http-proxy-middleware';

export interface ProxyTable {
  [path: string]: Options;
}
