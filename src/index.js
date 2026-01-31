import 'dotenv/config'
import express from 'express'
import weatherRoutes from './routes/weatherRoutes.js'
import path from 'path'
import responseTime from 'response-time'
import { weatherLimiter } from './middlewares/rateLimiter.js'
import { connectRedis } from './config/redis.js'

await connectRedis()

const app = express()

app.use(express.static('src/public'))

app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} → ${time.toFixed(2)} ms`)
}))

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/public/home.html'))
})

app.use('/weather', weatherLimiter, weatherRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
