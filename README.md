# Weather API

A weather API built with Node.js and Express that fetches and returns weather data from the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api/).

The project implements caching with Redis to improve performance and reduce external API requests, along with rate limiting and response time tracking.

https://roadmap.sh/projects/weather-api-wrapper-service

## Prerequisites

* Node.js installed on your system
* Redis installed on your system and running

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/FeduuML/weather-api.git
cd weather-api
npm install
```

Create a .env file in the root directory and configure the following environment variables

```
API_KEY=your_visual_crossing_api_key
PORT=3000
REDIS_URL=redis://localhost:6379
```

## Running the project

1. Start the server

```
npm run dev
```

2. Run the application in your browser

```
http://localhost:3000
```

## Usage

Example request:

```
GET /api/weather?city=London
```
