async function fetchWeather(lat, lon) {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch weather')
  return await response.json()
}