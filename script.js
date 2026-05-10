async function fetchWeather(lat, lon) {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch weather')
  return await response.json()
}

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

const fetchButton = document.getElementById('fetch-weather')

fetchButton.addEventListener('click', async () => {
  let lat = document.getElementById('lat').value
  let lon = document.getElementById('lon').value

  const data = await fetchWeather(lat, lon)
  displayCurrentWeather(data)
})
