import { Card, Descriptions, Image, Space, Tag, Typography } from 'antd'
import { motion } from 'framer-motion'
import { Hotel } from '../../../../hooks/owner'
import { MailOutlined, PhoneOutlined, GlobalOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import HotelMapModal from '../../hotelMapModal'
import { useState } from 'react'

const { Title, Paragraph, Link: AntLink } = Typography

interface HotelInfoProps {
  hotel: Hotel
}

export const HotelInfo = ({ hotel }: HotelInfoProps) => {
  const [mapOpen, setMapOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='space-y-6'
    >
      <Card title={<Title level={4}>Thông tin khách sạn</Title>} bordered={false} className='shadow-md rounded-2xl'>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }} layout='vertical'>
          <Descriptions.Item label='Tên khách sạn'>{hotel.name}</Descriptions.Item>

          <Descriptions.Item label='Địa chỉ'>
            <Space>
              <EnvironmentOutlined />
              <div>
                {hotel.address}, {hotel.country}
              </div>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Số sao'>
            {hotel.star ? (
              <Tag color='gold'>
                <StarOutlined /> {hotel.star}
              </Tag>
            ) : (
              <Tag color='default'>Chưa có</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label='Loại hình'>
            <Tag color='blue'>{hotel.type.toUpperCase()}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label='Rating trung bình'>
            {hotel.rating !== undefined && hotel.rating !== null ? (
              <Tag color='green'>{hotel.rating.toFixed(1)} / 5</Tag>
            ) : (
              <Tag color='default'>Chưa có</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label='Email'>
            <Space>
              <MailOutlined /> <AntLink href={`mailto:${hotel.email}`}>{hotel.email}</AntLink>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Điện thoại'>
            <Space>
              <PhoneOutlined /> {hotel.phoneNumber}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Website'>
            <Space>
              <GlobalOutlined />
              {hotel.website ? (
                <AntLink href={hotel.website} target='_blank' rel='noreferrer'>
                  {hotel.website}
                </AntLink>
              ) : (
                ' Chưa có'
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Tiện nghi'>
            <div className='flex flex-wrap gap-2 max-h-28 overflow-y-auto'>
              {hotel.amenities?.map((item) => (
                <Tag key={item} color='cyan'>
                  {item}
                </Tag>
              ))}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='Vĩ độ (Latitude)'>{hotel.latitude ?? 'Chưa có'}</Descriptions.Item>
          <Descriptions.Item label='Kinh độ (Longitude)'>{hotel.longitude ?? 'Chưa có'}</Descriptions.Item>
          <Descriptions.Item label='Bản đồ'>
            <button
              onClick={() => {
                setMapOpen(true)
              }}
              className='text-blue-500 hover:underline'
            >
              Xem bản đồ
            </button>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className='shadow-md rounded-2xl' bordered={false}>
        <Title level={5}>Mô tả ngắn</Title>
        <Paragraph>{hotel.description ? hotel.description : 'Chưa có mô tả'}</Paragraph>

        <Title level={5}>Mô tả chi tiết</Title>
        <Paragraph>{hotel.longDescription ? hotel.longDescription : 'Chưa có mô tả'}</Paragraph>
      </Card>
      <Card title={<Title level={5}>Ảnh nổi bật của khách sạn</Title>} bordered={false} className='shadow-md'>
        {hotel.images && hotel.images.length > 0 && (
          <div>
            <Image.PreviewGroup>
              <Space wrap size='small'>
                {hotel.images.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    width={100}
                    height={75}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    alt={`hotel-image-${index}`}
                    placeholder
                  />
                ))}
              </Space>
            </Image.PreviewGroup>
          </div>
        )}
      </Card>
      <HotelMapModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        latitude={Number(hotel.latitude)}
        longitude={Number(hotel.longitude)}
        hotelName={hotel.name}
      />
    </motion.div>
  )
}
