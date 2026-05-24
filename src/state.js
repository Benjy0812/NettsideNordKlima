// Extract latitude and longitude from the location data
export function getCordsFromLocations(location) {
  const { lat, lon } = location[0]
  return { lat: parseFloat(lat), lon: parseFloat(lon) }
}
