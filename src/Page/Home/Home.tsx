import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Video from '../../assets/video.mp4'
import Image from '../../assets/ImageHome.png'
import Section from './Section'
import FormSearch from './FormSeach'
import MapSection from '../../Components/map'
const CityImageMap = {
  "Hội An": "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
  "Hạ Long Bay": "https://vcdn1-dulich.vnecdn.net/2022/05/07/vinhHaLongQuangNinh-1651912066-8789-1651932294.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=bAYE9-ifwt-9mB2amIjnqg",
  "Sapa": "https://www.getvisavietnam.com/wp-content/uploads/2023/06/Y-Linh-Ho-Village-Sapa.jpg"
}
const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current) {
          // Đặt thời gian bắt đầu của video (nếu cần)
          videoRef.current.currentTime = 0

          // Đặt thời gian kết thúc của video sau 15 giây
          const endTime = 15

          const handleTimeUpdate = () => {
            if (videoRef.current && videoRef.current.currentTime >= endTime) {
              videoRef.current.currentTime = 0 // Quay lại đầu video
            }
          }

          videoRef.current.addEventListener('timeupdate', handleTimeUpdate)

          // Cleanup function
          return () => {
            if (videoRef.current) {
              videoRef.current.removeEventListener('timeupdate', handleTimeUpdate)
            }
          }
        }
      })
    }
  }, [])

  return (
    <div className='bg-white text-gray-800'>
      {/* Hero Section */}
      <section className='relative h-screen overflow-hidden'>
        <video
          ref={videoRef}
          className='p-2 rounded-[30px] absolute inset-0 w-full h-full object-cover'
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={Video} type='video/mp4' />
        </video>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t m-2 rounded-[15px] from-black to-transparent opacity-50'></div>

        <div className='relative z-10 h-full flex items-center justify-center text-white'>
          <div className='grid grid-cols-2'>
            <div className='col-span-1 mx-16'>
              <h1 className='text-5xl md:text-6xl font-bold mb-4'>Khám Phá Việt Nam</h1>
              <p className='text-xl md:text-4xl mb-8'>Trải nghiệm vẻ đẹp đa dạng và văn hóa phong phú</p>
              {/* <Link
                to='/roomlist
              '
              >
                <motion.button
                  className='bg-primary text-white px-8 py-3 mt-5 rounded-full font-bold hover:bg-primary/90 transition'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đặt Phòng ngay
                </motion.button>
              </Link> */}
              <p className='text-base md:text-lg mt-20'>
                Dù là một chuyến đi nghỉ dưỡng ngắn ngày hay một kỳ nghỉ dài, chúng tôi luôn có sẵn những gói dịch vụ
                tốt nhất để đáp ứng mọi nhu cầu của bạn. Đặt chỗ ngay để không bỏ lỡ những trải nghiệm tuyệt vời tại
                Việt Nam.
              </p>
            </div>
            <FormSearch />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <Section />

      {/* Destinations Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center'>Điểm Đến Nổi Bật</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {(['Hạ Long Bay', 'Hội An', 'Sapa'] as Array<keyof typeof CityImageMap>).map((place, index) => (
              <motion.div
                key={place}
                className='bg-white rounded-lg shadow-lg overflow-hidden'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={CityImageMap[place]} alt={place} className='w-full h-48 object-cover' />
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-2'>{place}</h3>
                  <p className='text-gray-600'>Khám phá vẻ đẹp độc đáo và văn hóa phong phú của {place}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.01 }}
        className='h-3/5 mx-auto w-5/6 rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 bg-white'
      >
        <MapSection />
      </motion.div>
      {/* Testimonials Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center'>Khách Hàng Nói Gì</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              className='bg-white rounded-lg shadow-lg p-6'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className='text-gray-600 mb-4'>"Đặt phòng trên BTravel cực kỳ dễ dàng và nhanh chóng! Chỉ vài cú nhấp chuột là tôi đã có chỗ nghỉ ưng ý tại Đà Nẵng."</p>
              <p className='font-bold'>Emily Nguyen, Mỹ</p>
            </motion.div>
            <motion.div
              className='bg-white rounded-lg shadow-lg p-6'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className='text-gray-600 mb-4'>"Tôi rất ấn tượng với giao diện thân thiện và dịch vụ hỗ trợ 24/7 của BTravel. Sẽ tiếp tục dùng trong các chuyến đi tới!"</p>
              <p className='font-bold'>Kenji Yamamoto, Nhật Bản</p>
            </motion.div>
            <motion.div
              className='bg-white rounded-lg shadow-lg p-6'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className='text-gray-600 mb-4'>"Giá cả rõ ràng, nhiều lựa chọn phong phú – BTravel giúp chuyến du lịch Việt Nam của tôi trở nên suôn sẻ hơn bao giờ hết!"</p>
              <p className='font-bold'> Sophie Dubois, Pháp</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
