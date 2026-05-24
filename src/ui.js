export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Display the current weather data on the page
export function displayCurrentWeather(data) {
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
  document.getElementById('temp').textContent =
    `Temperatur: ${air_temperature} °C`
  document.getElementById('pressure').textContent =
    `Tryk: ${air_pressure_at_sea_level} hPa`
  document.getElementById('humidity').textContent =
    `Luftfuktighet: ${relative_humidity} %`
  document.getElementById('clouds').textContent =
    `Skyer: ${cloud_area_fraction} %`
  document.getElementById('wind').textContent =
    `Vind: ${wind_speed} m/s fra ${wind_from_direction}°`
  document.getElementById('symbol').textContent = `Vær: ${symbolCode}`
}
