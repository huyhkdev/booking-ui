import React from 'react'
import { Card, Col, Row, Typography, Tag, Button } from 'antd'
import { motion } from 'framer-motion'
import { Room } from '../../../hooks/room/useSearchRoom'
import LoadingElement from '../../../Components/LoadingElement'
import { SearchRoomRequest } from '../../../hooks/room/types'
import { Link } from 'react-router-dom'
const { Title } = Typography

interface Props {
  rooms: Room[]
  total: number
  isLoading: boolean
  searchParams: SearchRoomRequest
  onLoadMore: () => void
}
const RoomList = ({ rooms, total, isLoading, searchParams, onLoadMore }: Props) => {
  const renderRoomCard = (room: Room) => {
    const { hotel, name, amenities, pricePerNight, reviews } = room
    const averageRating = reviews.length
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  : 0;
    const numOfNights = new Date(searchParams.checkOutDate).getDate() - new Date(searchParams.checkInDate).getDate()
    const discountedPrice = pricePerNight * numOfNights
    return (
      <Col span={24} key={room._id}>
        <Card
          hoverable
          className='room-card shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 mt-5'
        >
          <Link
            to={`/hotelDetails/${room.hotel._id}?checkInDate=${searchParams.checkInDate}&checkOutDate=${searchParams.checkOutDate}&capacity=${searchParams.capacity}`}
            className='block'
          >   <div className='p-4 flex justify-between'>
          <img alt={hotel.name} src={hotel.images[0]} className='w-[40%] h-48 object-cover' />

          <div className='flex flex-col'>
            <p className='text-blue-500 text-xl'>{hotel.name}</p>
            <div className='flex gap-1 text-blue-600 text-xs'>
              {hotel.amenities.slice(0, 2).map((amenity) => (
                <Tag color='green' key={amenity}>
                  {amenity}
                </Tag>
              ))}
            </div>
            <div className='mt-3 bg-slate-200 rounded-md p-2'>
              <p className='text-sm font-medium'>{name}</p>
              {amenities.slice(0, 3).map((amenity) => (
                <Tag key={amenity}>{amenity}</Tag>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-between gap-1'>
            <div className='flex justify-center gap-2'>
              <div className='flex flex-col'>
                <span className='text-[#595959] text-xs font-medium'>{reviews?.length === 0 ? "Chưa có " : reviews?.length } đánh giá</span>
              </div>
              <div className='bg-blue-900 text-white h-10 w-10 flex items-center justify-center rounded-md'>
                {averageRating}
              </div>
            </div>
            <div className='text-right'>
              <p>
                {numOfNights} đêm, {searchParams.capacity} người
              </p>
              <p className='text-sm line-through'>
                VND { ( (pricePerNight * numOfNights) + (pricePerNight * numOfNights * 0.25) ).toLocaleString()}
              </p>
              <p className='text-xl'>VND {discountedPrice.toLocaleString()}</p>
            </div>
            <Button>Xem phòng</Button>
          </div>
        </div>

          </Link>
       
        </Card>
      </Col>
    )
  }

  const renderContent = () => (
    <div className='p-4'>
      <Title level={3}>
        BTravel: đã tìm thấy <span className='result_find'>{rooms.length}</span> kết quả
      </Title>

      <Row className='overflow-y-scroll max-h-[600px]' gutter={[16, 16]}>
        {rooms.map(renderRoomCard)}

        {total > searchParams.limit && (
          <motion.button
            onClick={onLoadMore}
            type='button'
            className='w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tải thêm
          </motion.button>
        )}
      </Row>
    </div>
  )

  return isLoading ? <LoadingElement /> : renderContent()
}

export default RoomList
