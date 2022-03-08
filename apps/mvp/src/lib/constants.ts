export const isProd = import.meta.env.MODE === 'production';
export const isServer = typeof window === 'undefined';
