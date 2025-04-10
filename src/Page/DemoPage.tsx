import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Spin } from 'antd';

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// Icon mặc định cho các khách sạn
const defaultIcon = new L.Icon.Default();

// Danh sách khách sạn ở Đà Nẵng
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

const DemoPage = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Lỗi lấy vị trí:", err);
        setUserPosition([16.0544, 108.2022]);
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
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <MapContainer
      center={userPosition}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userPosition} icon={redIcon}>
        <Popup>
          <div style={{ fontWeight: 'bold', color: '#e63946' }}>
            📍 Bạn đang ở đây!
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
  );
};

export default DemoPage;
