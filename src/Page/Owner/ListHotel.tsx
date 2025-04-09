import { Button } from "antd"
import { useNavigate } from "react-router-dom"

export const ListHotel = () => {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-4'>Khách sạn của bạn</h1>
      <div>ádasd</div>
      <Button onClick={() => navigate('/owner/hotels/register')}>Đăng ngay</Button>
    </div>
  )
}
