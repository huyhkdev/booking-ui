import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Spin } from 'antd'
import { motion } from 'framer-motion'
import { useAllHotels } from '../../hooks/hotel/useAllHotels'

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
const defaultIcon = new L.Icon.Default()

// Giới hạn Việt Nam
const vietnamBounds: L.LatLngBoundsExpression = [
  [8.1790665, 102.14441],
  [23.392694, 109.46922]
]

const MapSection = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [isRealPosition, setIsRealPosition] = useState(false)
  const { data: hotels, isLoading: hotelsLoading } = useAllHotels()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserPosition([latitude, longitude])
        setIsRealPosition(true)
      },
      (err) => {
        console.error('Lỗi lấy vị trí:', err)
        setUserPosition([16.0544, 108.2022])
        setIsRealPosition(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [])

  if (!userPosition || hotelsLoading || !hotels) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Spin size='large' />
      </div>
    )
  }

  const validHotels = (hotels || []).filter((h) => {
    const lat = parseFloat(h.latitude)
    const lng = parseFloat(h.longitude)
    return !isNaN(lat) && !isNaN(lng)
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='overflow-hidden rounded-2xl shadow-xl border border-gray-200'
    >
      <MapContainer
        center={userPosition}
        zoom={15}
        style={{ height: '80vh', width: '100%' }}
        maxBounds={vietnamBounds}
        maxBoundsViscosity={0.8}
        minZoom={6}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={userPosition} icon={isRealPosition ? redIcon : defaultIcon}>
          <Popup>
            <div style={{ fontWeight: 'bold', color: isRealPosition ? '#e63946' : '#555' }}>
              {isRealPosition ? '📍 Bạn đang ở đây!' : '⚠️ Không thể xác định vị trí chính xác, đang hiển thị gần đúng'}
            </div>
          </Popup>
        </Marker>

        {validHotels.length === 0 ? (
          <></>
        ) : (
          validHotels.map((hotel) => {
            const lat = parseFloat(hotel.latitude)
            const lng = parseFloat(hotel.longitude)
            return (
              <Marker key={hotel._id} position={[lat, lng]} icon={defaultIcon}>
                <Popup>
                  <div style={{ fontWeight: 'bold' }}>{hotel.name}</div>
                  <div>{hotel.address || 'Khách sạn tại Việt Nam'}</div>
                </Popup>
              </Marker>
            )
          })
        )}
      </MapContainer>
    </motion.div>
  )
}

export default MapSection
