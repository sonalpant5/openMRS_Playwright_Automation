export const log = (...args: unknown[]) => {
  // minimal logger; can be expanded
  // eslint-disable-next-line no-console
  console.log('[log]', ...args);
};
