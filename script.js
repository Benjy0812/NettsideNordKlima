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
}
