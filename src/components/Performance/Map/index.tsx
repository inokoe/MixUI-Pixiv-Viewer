import { useEffect, useRef, memo, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface PerformanceMapProps {
  latitude: number
  longitude: number
}

const createRedIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
    width: 24px;
    height: 24px;
    background-color: red;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

const PerformanceMap = memo(({ latitude, longitude }: PerformanceMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || mapRef.current) return

    mapRef.current = L.map(mapContainerRef.current, {
      attributionControl: false,
      // 地图缩放+-
      zoomControl: false,
    }).setView([latitude, longitude], 10)

    L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      {
        minZoom: 3,
        maxZoom: 17,
        subdomains: ['1', '2', '3', '4'],
        attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
      }
    ).addTo(mapRef.current)
  }, [latitude, longitude])

  const updateMapView = useCallback(() => {
    if (!mapRef.current) return

    mapRef.current.setView([latitude, longitude], 10)

    if (markerRef.current) {
      markerRef.current.remove()
    }

    markerRef.current = L.marker([latitude, longitude], { icon: createRedIcon() })
      .addTo(mapRef.current)
      .bindPopup(`位置: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
  }, [latitude, longitude])

  useEffect(() => {
    initializeMap()
    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
      }
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [initializeMap])

  useEffect(() => {
    updateMapView()
  }, [updateMapView])

  return (
    <div
      ref={mapContainerRef}
      className='w-full h-full'
    />
  )
})

PerformanceMap.displayName = 'PerformanceMap'

export default PerformanceMap
