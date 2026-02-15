export const generateHeatmapZones = () => {
  return Array.from({ length: 8 }).map(() => ({
    lat: 15 + Math.random() * 1.5,
    lng: 75 + Math.random() * 1.5,
    intensity: Math.random()
  }));
};
