import React from 'react'

const Footer = () => {
  return (
    <div className='bg-white text-black py-10 px-8 border-t'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='font-bold mb-2'>Liên Hệ</h3>
            <p>123 Đường Đặt Phòng</p>
            <p>Thành phố, Quốc gia</p>
            <p>Email: info@datphong.com</p>
            <p>Điện thoại: +84 123 456 789</p>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Liên Kết Nhanh</h3>
            <ul>
              <li>
                <a href='#' className='hover:underline'>
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Dịch Vụ
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Theo Dõi Chúng Tôi</h3>
            <ul className='flex space-x-4'>
              <li>
                <a href='#' className='hover:underline'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Twitter
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Đăng Ký</h3>
            <p>Nhận thông tin cập nhật và ưu đãi mới nhất.</p>
            <input
              type='email'
              placeholder='Email của bạn'
              className='p-2 mt-2 w-full border-b my-1 border-primary  focus:outline-none focus:ring-primary focus:border-primary'
            />
            <button className='bg-primary rounded-md text-white p-2 mt-2 w-full hover:bg-primary/90'>Đăng Ký</button>
          </div>
        </div>
        <div className='text-center mt-10'>
          <p>&copy; 2023 Website Đặt Phòng. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
