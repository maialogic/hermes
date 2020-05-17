import _getPort from 'get-port';

/**
 * Get available ports, turn to the next after being occupied
 */
export async function getPort(host: string, port: number): Promise<number> {
  const result = await _getPort({ host, port });

  // Return this port number if not occupied
  if (result === port) {
    return result;
  }

  // Recursive, port number +1
  return getPort(host, port + 1);
}
