// Fetch location data from the Nominatim API based on user input
async function getLocation(place) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`
  const response = await fetch(url, {
    headers: { 'User-Agent': 'NordKlima/0.1 ' },
  })
  if (!response.ok) throw new Error('Failed to get location')
  return await response.json()
}

// Extract latitude and longitude from the location data
function getCordsFromLocations(location) {
  const { lat, lon } = location[0]
  return { lat: parseFloat(lat), lon: parseFloat(lon) }
}

// Fetch weather data from the Norwegian Meteorological Institute API and display it on the page
async function fetchWeather(lat, lon) {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
  const response = await fetch(url, {
    headers: { 'User-Agent': 'NordKlima/0.1' },
  })
  if (!response.ok) throw new Error('Failed to fetch weather')
  return await response.json()
}

// Display the current weather data on the page
function displayCurrentWeather(data) {
  const current = data.properties.timeseries[0]
  const {
    air_pressure_at_sea_level,
    air_temperature,
    cloud_area_fraction,
    relative_humidity,
    wind_from_direction,
    wind_speed,
  } = current.data.instant.details
  const symbolCode = current.data.next_1_hours.summary.symbol_code

  // Update the DOM elements with the fetched weather data
  document.getElementById('temp').textContent = `Temp: ${air_temperature} °C`
  document.getElementById('pressure').textContent =
    `Pressure: ${air_pressure_at_sea_level} hPa`
  document.getElementById('humidity').textContent =
    `Humidity: ${relative_humidity} %`
  document.getElementById('clouds').textContent =
    `Clouds: ${cloud_area_fraction} %`
  document.getElementById('wind').textContent =
    `Wind: ${wind_speed} m/s from ${wind_from_direction}°`
  document.getElementById('symbol').textContent = `Weather: ${symbolCode}`
}

const fetchButton = document.getElementById('fetch-button')
fetchButton.addEventListener('click', async () => {
  // Get the location input from the user
  const locationName = document.getElementById('location-input').value.trim()
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
    const { lat, lon } = getCordsFromLocations(locationCordinates)
    const weatherData = await fetchWeather(lat, lon)
    displayCurrentWeather(weatherData)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
})
