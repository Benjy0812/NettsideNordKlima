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

  updateTemperature(air_temperature)

  const tempToggle = document.getElementById('temp-toggle')
  tempToggle.addEventListener('change', () => {
    updateTemperature(air_temperature)
  })
  const canvas = document.getElementById('arrow')
  const ctx = canvas.getContext('2d')
  arrowDirection(
    ctx,
    canvas.width / 2,
    canvas.height / 2,
    wind_from_direction,
    100,
  )
}

export function arrowDirection(ctx, cx, cy, wind_from_direction, length) {
  const blowTo = (wind_from_direction + 180) % 360

  // convert degress to radiance
  const rad = (blowTo * Math.PI) / 180

  const horizontal = cx + Math.sin(rad) * length
  const vertical = cy + Math.cos(rad) * length
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(horizontal, vertical)
  ctx.stroke()
}

// Update the temperature display based on the selected unit (Celsius or Fahrenheit)
export function updateTemperature(air_temperature) {
  const tempC = air_temperature
  const tempToggle = document.getElementById('temp-toggle')
  if (tempToggle.value === 'Celsius') {
    document.getElementById('temp').textContent = `Temperatur: ${tempC} °C`
  } else {
    const tempF = (tempC * 9) / 5 + 32
    tempF.toFixed(2)
    document.getElementById('temp').textContent = `Temperatur: ${tempF} °F`
  }
}
