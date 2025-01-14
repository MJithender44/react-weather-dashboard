import axios from 'axios'
import axiosRetry from 'axios-retry'
import FormatTime from './FormatTime'
import isValid from './ValidityChecker'
import WEATHER_DATA from '../constants/weatherData'

// Exponential back-off retry delay between requests
axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay, retries: 1})

export const getURL = (lat,lng) => {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
}

const computedWeatherData = (weatherData) => {
  let weatherCurrent = {}
  let weatherForecast = {}
  let alerts = []

  if (isValid(weatherData)) {
    // NOTE: add timezone property to current, days, and timeFrame data to use it later for
    // displaying weatherIcon with day or night variants specific to location timezone
    // parsing sunriseTime & sunsetTime according to the timezone
    const timezone = weatherData.timezone

    weatherCurrent = {
      timezone,
      ...weatherData.current,
      sunrise: weatherData.current.sunrise,
      sunset: weatherData.current.sunset,
    }

    // group 48 hours into days as keys in timeFrames
    // group days and timeFrames into weatherForecast
    const timeFrames = {}
    // create date as the keys for timeFrame in timeFrames
    // i.e timeFrames: {'02/28/2020': [{...timeFrame},...], ...}
    weatherData.hourly.forEach((hour) => {
      const date = FormatTime(hour.dt, timezone, 'MM/DD/YYYY')
      if (Object.keys(timeFrames).includes(date)) {
        timeFrames[date].push({timezone, ...hour})
      } else {
        timeFrames[date] = [{timezone, ...hour}]
      }
    })

    const days = {}
    // create date as the keys for the day in days
    // i.e days: {'02/28/2020': {...day}, ...}
    weatherData.daily.forEach((day) => {
      const date = FormatTime(day.dt, timezone, 'MM/DD/YYYY')
      // since there will be unique day objects in days
      // just create a 'date' key with day object as value for as many days
      days[date] = {timezone, ...day}
    })

    weatherForecast = {timeFrames, days}

    if (isValid(weatherData.alerts)) {
      weatherData.alerts.forEach((alert) => {
        alerts.push({
          timezone,
          ...alert,
        })
      })
    }
  };

  return {
    weatherCurrent,
    weatherForecast,
    alerts,
  }
}

const FetchWeatherData = async ({latlong}, sample = false) => {
  let weatherData = null
  let error = null
  try {
    if (sample) {
      weatherData = WEATHER_DATA
    } else if (isValid(latlong)) {
      const coords = latlong.split(",");
      // fetch weather data only when latlong is valid to avoid uneccessary API calls
      weatherData = (await axios.get(getURL(coords[0], coords[1]))).data
    }
  } catch (err) {
    error = err
    console.error(err)
  }

  return {
    ...computedWeatherData(weatherData),
    error,
  }
};

export default FetchWeatherData;