import redis from 'redis';
import config from './config';
const client = redis.createClient({ url: config.REDIS_URL || 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log("Redis client connected"))
client.connect();

export default client;