import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import Logout from '../Logout'
import { useIsLogin, useUserObject } from '../../hooks/auth/useUserInfo'

const InforHeader = () => {
  const isLogin = useIsLogin()
  const user = useUserObject()
  // popover
  const content = (
    <div className='w-[200px]  bg-white    '>
      {!isLogin ? (
        <>
          <h3 className='text-lg font-semibold mb-2'>Chào mừng bạn!</h3>
          <Link to='/login' className='block text-black hover:bg-primary hover:text-white mb-2 p-2 rounded'>
            Đăng nhập
          </Link>
          <Link to='/register' className='block text-black hover:bg-primary hover:text-white p-2 rounded'>
            Đăng ký
          </Link>
        </>
      ) : (
        <div className='w-[200px]'>
          <h3 className='text-lg font-semibold mb-2 '>Xin chào, {user.fullName}!</h3>
          <Link to='/profile' className='block  text-black hover:bg-primary hover:text-white p-2 rounded'>
            Thông tin cá nhân
          </Link>
          <Link to='/owner/hotels' className='block  text-black hover:bg-primary hover:text-white p-2 rounded'>
            Quản lý khách sạn
          </Link>
          <Link to='/change-password' className='block  text-black hover:bg-primary hover:text-white p-2 rounded'>
            Đổi mật khẩu
          </Link>
          <Logout />
        </div>
      )}
    </div>
  )
  return (
    <div className='flex items-center gap-4 cursor-pointer'>
      {user.role === 'user' && (
        <Link
          to='/owner/request'
          className='text-[16px] font-medium text-black hover:bg-grey1 rounded-full p-3 transition duration-300 ease-in-out'
        >
          Đăng ký thành chủ khách sạn ngay
        </Link>
      )}
      <Popover content={content} trigger='click' className='hover:shadow-xl '>
        <div className='flex items-center p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out '>
          {isLogin ? (
            <>
              {user.avatarUrl && <img src={user.avatarUrl} className='w-[30px] h-[30px] rounded-full'></img>}
              <span className='text-black px-1'>{user.fullName}</span>
            </>
          ) : (
            <div className='flex items-center w-16 justify-center py-1'>
              <MenuOutlined className='text-black text-[16px] ' />
              <UserOutlined className='text-black ml-2 text-[16px]' />
            </div>
          )}
        </div>
      </Popover>


    </div>
  )
}

export default InforHeader
