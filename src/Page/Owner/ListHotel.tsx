import { Button, Card, Spin, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useOwnerHotels } from '../../hooks/owner/useOwnerHotels'

export const ListHotel = () => {
  const navigate = useNavigate()
  const { data: hotels, isLoading } = useOwnerHotels()
  if (isLoading || !hotels) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='container mx-auto p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Khách sạn của bạn</h1>
        <Button type='primary' onClick={() => navigate('/owner/hotels/register')}>
          Đăng ngay
        </Button>
      </div>

      {hotels.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <Empty description='Chưa có khách sạn nào' />
          <Button
            type='primary'
            className='mt-6'
            onClick={() => navigate('/owner/hotels/register')}
          >
            Đăng khách sạn đầu tiên
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {hotels?.map((hotel) => (
            <Card
              key={hotel._id}
              hoverable
              cover={<img alt={hotel.name} src={hotel.images[0]} className='h-60 object-cover w-full' />}
              className='rounded-2xl shadow-md'
            >
              <h2 className='text-lg font-semibold'>{hotel.name}</h2>
              <p className='text-sm text-gray-500'>
                {hotel.address}
              </p>
              <Button className='mt-4' type='link' onClick={() => navigate(`/owner/hotels/${hotel._id}`)}>
                Quản lý
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
