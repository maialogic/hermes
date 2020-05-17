import { argv } from 'yargs';

const DEFAULT_PORT = 3000;
const ENABLE_OPEN = argv.open as true | string;
const HMR_PATH = '/hmr';
const HOST = '127.0.0.1';

export default { DEFAULT_PORT, ENABLE_OPEN, HMR_PATH, HOST };
