import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Spin } from 'antd';
import { motion } from 'framer-motion';

// Icon user và default
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const defaultIcon = new L.Icon.Default();

// Danh sách khách sạn
const hotels: { name: string; position: [number, number] }[] = [
  { name: "Furama Resort Danang", position: [16.0432, 108.2498] },
  { name: "Novotel Danang Premier Han River", position: [16.0778, 108.2244] },
  { name: "InterContinental Danang Sun Peninsula Resort", position: [16.1232, 108.2977] },
  { name: "Grand Mercure Danang", position: [16.0469, 108.2260] },
  { name: "Danang Golden Bay Hotel", position: [16.0870, 108.2252] },
  { name: "Balcona Hotel Da Nang", position: [16.0584, 108.2493] },
  { name: "Muong Thanh Luxury Hotel", position: [16.0549, 108.2511] },
  { name: "Haian Beach Hotel & Spa", position: [16.0524, 108.2527] }
];

// Giới hạn Việt Nam (khoảng bounding box)
const vietnamBounds = [
  [8.1790665, 102.14441],   // SW
  [23.392694, 109.46922]    // NE
] as L.LatLngBoundsExpression;

const MapSection = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [isRealPosition, setIsRealPosition] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
        setIsRealPosition(true);
      },
      (err) => {
        console.error("Lỗi lấy vị trí:", err);
        // fallback: trung tâm Đà Nẵng
        setUserPosition([16.0544, 108.2022]);
        setIsRealPosition(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  if (!userPosition) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Spin size='large' />
      </div>
    )
  }

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
        scrollWheelZoom={true}
        style={{ height: "80vh", width: "100%" }}
        maxBounds={vietnamBounds}
        maxBoundsViscosity={0.8}
        minZoom={6}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userPosition} icon={isRealPosition ? redIcon : defaultIcon}>
          <Popup>
            <div style={{ fontWeight: 'bold', color: isRealPosition ? '#e63946' : '#555' }}>
              {isRealPosition ? '📍 Bạn đang ở đây!' : '⚠️ Không thể xác định vị trí chính xác, đang hiển thị gần đúng'}
            </div>
          </Popup>
        </Marker>

        {hotels.map((hotel, index) => (
          <Marker key={index} position={hotel.position} icon={defaultIcon}>
            <Popup>
              <div style={{ fontWeight: 'bold' }}>{hotel.name}</div>
              <div>🏨 Khách sạn tại Đà Nẵng</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default MapSection;
