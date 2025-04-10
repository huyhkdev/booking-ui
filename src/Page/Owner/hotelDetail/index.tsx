import { Spin, Typography } from 'antd'
import { HomeOutlined, SafetyOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import { useParams } from 'react-router-dom'
import { useOwnerHotelDetail } from '../../../hooks/owner'

const { Title } = Typography

export const HotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>()
  const { data: hotel, isLoading } = useOwnerHotelDetail(hotelId as string)

  if (isLoading || !hotel) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='main'>
      <div className='container mx-auto my-5'>
        <header className='flex justify-between items-center'>
          <Title level={2}>{hotel?.name}</Title>
          <Rate disabled defaultValue={hotel?.rating} />
        </header>

        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-2'>
            <img src={hotel?.images[0]} alt='Large' className='w-full h-full object-cover rounded-lg' />
          </div>
          <div className='col-span-3 grid grid-cols-2 gap-2'>
            {hotel?.images
              .slice(1, 6)
              .map((img, idx) => <img key={idx} src={img} alt={`Image ${idx}`} className='w-full h-auto rounded-lg' />)}
          </div>
        </div>

        <div className='mt-5'>
          <Title level={3}>
            <HomeOutlined /> Giới thiệu
          </Title>
          <p>
            <strong>Địa chỉ:</strong> {hotel?.address}, {hotel?.city}, {hotel?.country}
          </p>
          <p>
            <strong>Loại:</strong> {hotel?.type}
          </p>
          <p>
            <strong>Hạng sao:</strong> {hotel?.star} sao
          </p>
          <p>
            <strong>Email:</strong> {hotel?.email}
          </p>
          <p>
            <strong>Điện thoại:</strong> {hotel?.phoneNumber}
          </p>
          {hotel?.website && (
            <p>
              <strong>Website:</strong>{' '}
              <a href={hotel.website} target='_blank' rel='noreferrer'>
                {hotel.website}
              </a>
            </p>
          )}
        </div>

        {/* Description */}
        <div className='mt-5'>
          <Title level={4}>Mô tả ngắn</Title>
          <p>{hotel?.description}</p>
          <Title level={4}>Mô tả chi tiết</Title>
          <p>{hotel?.longDescription}</p>
        </div>

        {/* Amenities */}
        <div className='mt-5 border-t border-b py-3'>
          <Title level={3}>
            <SafetyOutlined /> Tiện nghi
          </Title>
          <ul className='list-disc pl-5'>
            {hotel?.amenities.map((amenity, idx) => (
              <li key={idx} className='text-lg'>
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
