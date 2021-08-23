const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

const config = {
  url: `redis://${host}:${port}`
};

export { config };
