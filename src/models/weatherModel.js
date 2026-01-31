import axios from 'axios'
import redis from '../config/redis.js'
import 'dotenv/config'

export async function getWeatherByCity (city) {
  const cacheKey = `weather:${city.toLowerCase()}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.API_KEY}`)

  await redis.set(cacheKey, JSON.stringify(response.data), {
    EX: 60 * 60 // 1 hour
  })

  return response.data
}
