import { createClient } from 'redis'

const redisClient = createClient({ url: process.env.REDIS_URL })

redisClient.on('error', err => {
  console.log('Redis client error', err)
})

export async function connectRedis () {
  if (!redisClient.isOpen) {
    await redisClient.connect()
  }
}

export default redisClient
