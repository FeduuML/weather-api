import { getWeatherByCity } from '../models/weatherModel.js'

export async function getWeather (req, res) {
  const { city } = req.query

  const normalizedCity = city.trim()

  if (!normalizedCity) {
    return res.status(400).json({ error: 'City is required' })
  }

  try {
    const data = await getWeatherByCity(normalizedCity)
    res.status(200).json(data)
  } catch (error) {
    if (!error.response) {
      return res.status(500).json({ error: 'Internal server error' })
    }

    const status = error.response.status

    switch (status) {
      case 400:
        return res.status(400).json({ error: 'Invalid request' })
      case 401:
      case 403:
        return res.status(401).json({ error: 'Unauthorized request' })
      case 404:
        return res.status(404).json({ error: 'City not found' })
      case 429:
        return res.status(503).json({ error: 'Weather service rate limit exceeded' })
      default:
        return res.status(502).json({ error: 'Weather service error' })
    }
  }
}
