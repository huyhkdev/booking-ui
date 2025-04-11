import { Modal, Spin, Empty } from 'antd'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'

// Tọa độ giới hạn Việt Nam
const vietnamBounds: L.LatLngBoundsExpression = [
  [8.1790665, 102.14441],
  [23.392694, 109.46922],
]

// Icon marker đỏ cho khách sạn
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface HotelMapModalProps {
  open: boolean
  onClose: () => void
  latitude?: number
  longitude?: number
  hotelName: string
}

const isValidCoordinate = (lat?: number, lng?: number) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng)
  )
}

const HotelMapModal = ({ open, onClose, latitude, longitude, hotelName }: HotelMapModalProps) => {
  const [ready, setReady] = useState(false)
  const validCoords = isValidCoordinate(latitude, longitude)

  useEffect(() => {
    if (open && validCoords) {
      setTimeout(() => setReady(true), 300)
    } else {
      setReady(false)
    }
  }, [open, latitude, longitude])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Vị trí khách sạn"
      width={800}
      centered
      destroyOnClose
    >
      {!validCoords ? (
        <div className="flex justify-center items-center h-[300px]">
          <Empty description="Chưa có thông tin tọa độ để hiển thị bản đồ" />
        </div>
      ) : !ready ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl border shadow-md"
        >
          <MapContainer
            center={[latitude!, longitude!]}
            zoom={15}
            style={{ height: '400px', width: '100%' }}
            maxBounds={vietnamBounds}
            maxBoundsViscosity={0.8}
            minZoom={6}
            maxZoom={18}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude!, longitude!]} icon={redIcon}>
              <Popup>
                <div style={{ fontWeight: 'bold', color: '#e63946' }}>
                  🏨 {hotelName}
                </div>
                <div>Vị trí khách sạn</div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      )}
    </Modal>
  )
}

export default HotelMapModal
