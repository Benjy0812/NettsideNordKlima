import { getLocation, fetchWeather } from './api.js'
import { capitalizeFirstLetter, displayCurrentWeather } from './ui.js'
import { getCordsFromLocation } from './state.js'

async function getWeather() {
  // Get the location input from the user
  const locationName = document.getElementById('location-input').value.trim()
  const capitalizedLocationName = capitalizeFirstLetter(locationName)
  document.getElementById('location-title').textContent =
    capitalizedLocationName
  if (!locationName) {
    alert('Please enter a location')
    return
  }
  try {
    // Fetch lat and lon for the location
    const locationCordinates = await getLocation(locationName)
    if (!locationCordinates.length) {
      throw new Error('Location not found')
    }
    // then fetch and display the weather data
    const { lat, lon } = getCordsFromLocation(locationCordinates)
    const weatherData = await fetchWeather(lat, lon)
    displayCurrentWeather(weatherData)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

// window.onload = () => getWeather()

const fetchButton = document.getElementById('fetch-button')
fetchButton.addEventListener('click', () => getWeather())
