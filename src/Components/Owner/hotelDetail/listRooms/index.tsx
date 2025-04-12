import { Card, Empty, Button, Space, Tag, Typography, Image } from 'antd'
import { PlusOutlined, UserOutlined, DollarOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Room } from '../../../../hooks/room/useSearchRoom'

const { Title, Paragraph } = Typography

interface ListRoomProps {
  rooms: Room[]
}

export const ListRoom = ({ rooms }: ListRoomProps) => {
    console.log(rooms);
    const onAddRoom = () => {
      console.log("add");
      
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='space-y-6'
    >
      <Card
        title={
          <Space className='justify-between w-full' align='center'>
            <Title level={4} className='!mb-0'>Danh sách phòng</Title>
            <Button type='primary' icon={<PlusOutlined />} onClick={onAddRoom}>
              Thêm phòng mới
            </Button>
          </Space>
        }
        className='shadow-md rounded-2xl'
        bordered={false}
      >
        {rooms.length === 0 ? (
          <Empty description='Chưa có phòng nào' className='py-8'>
            <Button type='primary' icon={<PlusOutlined />} onClick={onAddRoom}>
              Thêm phòng mới
            </Button>
          </Empty>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {rooms.map((room, index) => (
              <Card
                key={index}
                hoverable
                className='shadow rounded-xl'
                cover={
                  room.images?.length ? (
                    <Image
                      alt={room.name}
                      src={room.images[0]}
                      height={180}
                      preview={false}
                      style={{ objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                    />
                  ) : null
                }
              >
                <Title level={5}>{room.name}</Title>
                <Paragraph className='text-sm text-gray-500'>{room.type}</Paragraph>

                <Space wrap size={[8, 4]} className='mb-2'>
                  <Tag icon={<DollarOutlined />} color='green'>
                    {room.pricePerNight?.toLocaleString()}đ / đêm
                  </Tag>
                  <Tag icon={<UserOutlined />} color='blue'>
                    {room.capacity} khách
                  </Tag>
                  <Tag color={room.isAvailable ? 'success' : 'error'} icon={room.isAvailable ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
                    {room.isAvailable ? 'Còn phòng' : 'Hết phòng'}
                  </Tag>
                </Space>

                <Paragraph ellipsis={{ rows: 2 }}>{room.description || 'Không có mô tả'}</Paragraph>

                <div className='mt-2 space-x-1'>
                  {room.amenities?.slice(0, 3).map((amenity) => (
                    <Tag key={amenity} color='cyan'>{amenity}</Tag>
                  ))}
                  {room.amenities?.length > 3 && <Tag>+{room.amenities.length - 3} tiện ích</Tag>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
